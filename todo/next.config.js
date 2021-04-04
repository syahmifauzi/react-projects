const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  future: {
    webpack5: true,
  },
  target: 'serverless',
  assetPrefix: isProd ? 'https://todo-sf.netlify.app' : '',
};
