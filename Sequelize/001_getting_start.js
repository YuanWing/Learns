const Sequelize = require('sequelize');

const config = {
  host: 'localhost',
  user: 'root',
  password: 'abc123',
  databse: 'mysql',
};
const sequelize = new Sequelize(config.databse, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
});