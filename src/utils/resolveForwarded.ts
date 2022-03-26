import axios from 'axios';
/**
 * This formats the formatter string and includes the variables in it
 * from `values` object.
 *
 * The variable key must be surrounded by `%` char.
 *
 * @example
 * ```js
 * const formattedString = formatString('https://example.com/%name%', { name: 'Cypherock' });
 * // Returns 'https://example.com/Cypherock'
 * ```
 *
 * @example
 * ```js
 * // If the message contains actual `%` symbol, it should be prefixed with `-`.
 * const formattedString = formatString('https://example.com/%name%/90-%',
 *  { name: 'Cypherock' }
 * );
 * // Returns 'https://example.com/Cypherock/90%'
 * ```
 */
export function formatString(
  formatter: string,
  values?: Record<string, any>,
  isStrict = false
): string {
  let valuesObj = values;
  if (!valuesObj) {
    valuesObj = {};
  }

  if (typeof valuesObj !== 'object') {
    throw new TypeError('`values` should be an object.');
  }

  if (!formatter || typeof formatter !== 'string') {
    throw new TypeError('`formatter` should be a string.');
  }

  let newString = '';
  let key = '';
  let isBuildingKey = false;

  for (let i = 0; i < formatter.length; i += 1) {
    const char = formatter.charAt(i);
    switch (char) {
      case '-':
        if (i + 1 < formatter.length && formatter.charAt(i + 1) === '%') {
          newString += '%';
          i += 1;
        } else {
          newString += '-';
        }
        break;
      case '%':
        isBuildingKey = !isBuildingKey;
        if (isBuildingKey) {
          key = '';
        } else {
          let value = valuesObj[key];
          if (value === null || value === undefined) {
            if (isStrict) {
              throw new Error(`Param \`${key}\` is not present.`);
            } else {
              value = '';
            }
          }
          newString += value;
        }
        break;
      default:
        if (isBuildingKey) {
          key += char;
        } else {
          newString += char;
        }
    }
  }

  if (isBuildingKey) {
    throw new Error('Invalid pairs of `%` in `formatter`.');
  }

  return newString;
}

/**
 * This is used to resolve forwarded request from the server.
 *
 * When the server need the client to make the API call to the 3rd party it sends
 * a forwarded request with the data: `{ isForwarded: true, method, url, lookup }`
 *
 * The `method` and `url` are used to make the api call, and the `lookup`
 * contains the JSON path to the required value.
 *
 * Lookups are separated by `.`, and it can be used to access array element or
 * object element.
 *
 * Ex: `data.tx_hex`, `data.[0].tx_hex`
 */
export default async function resolveForwarded(
  forwardedRes: any,
  params: Record<string, any> = {}
) {
  if (
    !(
      forwardedRes &&
      'method' in forwardedRes &&
      'url' in forwardedRes &&
      'lookup' in forwardedRes
    )
  ) {
    throw new Error('Invalid data from api');
  }

  let url = forwardedRes.url;

  if ('params' in forwardedRes) {
    for (const key in forwardedRes.params) {
      if (forwardedRes[key]) {
        if (!params[key]) {
          throw new Error(`Key: ${key} is required.`);
        }
      }
    }

    url = formatString(url, params);
  }

  const newRes = await axios({
    method: forwardedRes.method,
    url
  });

  if (!forwardedRes.lookup) {
    return newRes.data;
  }

  const lookupArr = (forwardedRes.lookup as string).trim().split('.');
  let finalData: any = newRes.data;

  for (const lookupElem of lookupArr) {
    // On array index, like - `[5]`
    if (lookupElem.startsWith('[') && lookupElem.endsWith(']')) {
      if (!Array.isArray(finalData)) {
        throw new Error(
          `Lookup (${forwardedRes.lookup}) is not compatable with the returned data.`
        );
      }

      const elemIndexStr = lookupElem.slice(1, lookupElem.length - 1);
      const index = parseInt(elemIndexStr, 10);

      if (Number.isNaN(index)) {
        throw new Error(
          `Lookup (${forwardedRes.lookup}) conatins non integer array index.`
        );
      }

      if (index >= finalData.length) {
        throw new Error(`Lookup (${forwardedRes.lookup}) exceeds array index.`);
      }

      finalData = finalData[index];
    } else {
      if (!(lookupElem in finalData)) {
        throw new Error(
          `Lookup (${forwardedRes.lookup}), object key (${lookupElem}) does not exist.`
        );
      }

      finalData = finalData[lookupElem];
    }
  }

  return finalData;
}
