let baseUrl;

// URL should not contain the last `/`
if (process.env.SERVER_ENV === 'production') {
  baseUrl = 'https://api.cypherock.com';
} else if (process.env.SERVER_ENV === 'development') {
  baseUrl = 'https://dev-api.cypherock.com';
} else if (process.env.SERVER_ENV === 'local') {
  baseUrl = 'http://localhost:8000';
} else {
  baseUrl = 'https://api.cypherock.com';
}

export default {
  BASE_URL: baseUrl
};
