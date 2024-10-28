const { Sequelize } = require('sequelize');

const connect = new Sequelize('pokeworld', 'root', '2558', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3310
});

module.exports = connect;