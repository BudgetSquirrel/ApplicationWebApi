const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    proxy({
        // This needs to be set to whatever our endpoint is.
      target: 'https://127.0.0.1:5001',
      secure: false,
      changeOrigin: true,
      ssl: {
          rejectUnauthorized: false
      }
    })
  );
};