const { Sequelize } = require('sequelize');

const connect = new Sequelize('pokeworld', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

module.exports = connect;