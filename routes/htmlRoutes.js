const db = require('../../models');
const childApiRoutes = require('./childApiRoutes');
const parentApiRoutes = require('./parentApiRoutes');
const forms = require('./forms');
const scheduleRoutes = require('./scheduleRoutes');
const mainRoutes = require('./mainroutes');

module.exports = function (app) {

  childApiRoutes(app);
  parentApiRoutes(app);
  forms(app);
  scheduleRoutes(app);
  mainRoutes(app);


  app.get('*', function (req, res) {
    res.render('404');
  });
};

