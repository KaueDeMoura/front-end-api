const jwt = require('jsonwebtoken');
const User = require('../models/User');

const autenticacao = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Nenhum token' });
  }

  try {
    const decode = jwt.verToken(token.split(' ')[1], 'secret_key');
    req.user = await User.findById(decode.id);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Nao autorizado' });
  }
};

const contaAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Somente admins podem acessar esta pagina' });
  }
  next();
};

const verToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Nenhum token' });
  }

  const BearerToken = token.split(' ')[1];

  jwt.verToken(BearerToken, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(401).json({ message: 'Falha ao tentar autentiar token' });
    }

    req.userId = decode.id;
    next();
  });
};

module.exports = { autenticacao, contaAdmin, verToken };
