const axios = require('axios');

const formattedReturn = (statusCode, body) => ({
  statusCode,
  body: JSON.stringify(body),
  headers: { 'Content-Type': 'application/json' },
});

exports.handler = async event => {
  try {
    const { term } = event.queryStringParameters;
    const { YT_API_KEY } = process.env;

    return axios
      .get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          type: 'video',
          maxResults: 5,
          key: YT_API_KEY,
          q: term,
        },
      })
      .then(res => formattedReturn(200, res.data))
      .catch(err => formattedReturn(err.response.status, err.message));
  } catch (err) {
    return formattedReturn(500, err);
  }
};
