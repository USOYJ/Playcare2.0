const { Sequelize } = require('sequelize');
require('dotenv').config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, JAWSDB_URL } = process.env;

let sequelize;

if (JAWSDB_URL) {
  sequelize = new Sequelize(JAWSDB_URL);
} else {
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST || 'localhost', 
    dialect: 'mysql',
    port: DB_PORT || 3306, 
  });
}

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;

