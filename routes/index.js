module.exports = function (app) {
  
  app.get('/favicon.ico', (req, res) => res.status(204));

  app.use(require('./main'));
  app.use(require('./auth'));

};