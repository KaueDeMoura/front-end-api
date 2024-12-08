const { DataTypes } = require("sequelize");
const database = require("../config/database");
 
const Pokemon = database.define("Pokemon", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [3, 50],
        msg: "O nome deve ter entre 3 e 50 caracteres.",
      },
    },
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "O tipo não pode estar vazio.",
      },
    },
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: {
        msg: "A imagem deve ser uma URL válida.",
      },
    },
  },
}, {
  timestamps: true,
});

module.exports = Pokemon;
