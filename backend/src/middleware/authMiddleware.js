const jwt = require("jsonwebtoken");
const UserController = require('../controllers/userController');

function authMiddleware(roles = []) {
  return async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ mensagem: "Token não fornecido" });
    }

    const BearerToken = token.split(' ')[1];

    try {
      const decode = jwt.verify(BearerToken, 'secret_key');
      
      const userLogged = await UserController.findUser(decode.id);
      
      if (!userLogged) {
        return res.status(404).json({ mensagem: "Usuario não encontrado" });
      }

      if (roles.length && !roles.includes(userLogged.role)) {
        return res.status(403).json({ mensagem: "Você não tem acesso" });
      }

      req.user = userLogged;
      next();
    } catch (error) {
      return res.status(401).json({ mensagem: "Token invalido", error });
    }
  };
}

module.exports = authMiddleware;