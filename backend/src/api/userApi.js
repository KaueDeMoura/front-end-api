const UserController = require('../controllers/userController');

class UserApi {

    async updateUserLogado(req, res) {
      const { id } = req.params;
      const { name, email, password, role } = req.body;
  
      try {
        const user = await UserController.updateUserLogado(Number(id), name, email, password, role);
         return res.status(200).send({ message: 'Dados atualizados com sucesso'});
      } catch (e) {
        return res.status(400).send({ error: `Erro ao atualizar usuario: ${e.message}` });
      }
    }
  
  
  

    async createUser(req, res) {
        const { name, email, password, role } = req.body;
      
        try {
          if (role === 'Admin' && req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Somente Admin pode criar outro Admin' });
          }
      
          const user = await UserController.createUser(name, email, password, role);
          return res.status(201).send({ message: 'Usuario criado com sucesso', user });
        } catch (e) {
          console.error("Erro ao criar usuario:", e);
          return res.status(400).send({ error: `Erro ao criar usuario: ${e.message}` });
        }
      }
      

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    try {
      const user = await UserController.updateUser(Number(id), name, email, password, role);
      return res.status(200).send(user);
    } catch (e) {
      return res.status(400).send({ error: `Erro ao atualizar usuario: ${e.message}` });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;

    try {
      await UserController.deleteUser(Number(id));
      return res.status(204).send({ message: 'Usuario deletado com sucesso' });
    } catch (e) {
      return res.status(400).send({ error: `Erro ao deletar usuario: ${e.message}` });
    }
  }

  async findUsers(req, res) {
    try {
      const users = await UserController.findUsers();
      return res.status(200).send(users);
    } catch (e) {
      return res.status(400).send({ error: `Erro ao listar usuarios: ${e.message}` });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
  
    try {
      const { token, role } = await UserController.loginUser(email, password);
  
      return res.status(200).send({ token, role });
    } catch (e) {
      return res.status(400).send({ error: e.message });
    }
  }
}

const userApiInstance = new UserApi();
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(userApiInstance)));

module.exports = userApiInstance;
