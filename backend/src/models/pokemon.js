const { DataTypes } = require("sequelize");
const database = require("../config/database");
 
const Pokemon = database.define("Pokemon", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  imagem: {
    type: DataTypes.STRING,  
    allowNull: true,
  },
});
 
module.exports = Pokemon;
