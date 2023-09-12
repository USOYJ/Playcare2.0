const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const db = require("./models");

// Replace '/config/config.json' with the actual path to your Sequelize configuration
const sequelize = require('./config/config.json');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create();

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: db.sequelize // Use the Sequelize instance from your models
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Define your routes variable
const routes = require('./routes');
app.use(routes);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});


