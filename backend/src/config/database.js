const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    dialect: process.env.DB_DIALECT,
    password: process.env.DB_PASSWORD,
                // dialectOptions: {
            //   ssl: {
            //     require: true,
            //     rejectUnauthorized: false
            //   }}
});

module.exports = sequelize;
