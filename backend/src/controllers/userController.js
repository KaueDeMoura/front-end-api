const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secret_key';
const SALT_VALUE = 10;

class UserController {

  async updateUserLogado(id, name, email, password) {
    const user = await this.findUser(id);

    if (email) {
      const userCriado = await User.findOne({ where: { email } });
      if (userCriado && userCriado.id !== id) {
        throw new Error('Email ja cadastrado');
      }
    }

    const updatedData = {
      name: name || user.name,
      email: email || user.email,
      password: password ? await bcrypt.hash(password, SALT_VALUE) : user.password
    };

    await user.update(updatedData);
    return user;
  }

  async createUser(name, email, password, role = 'Viewer') {
    if (!name || !email || !password) {
      throw new Error('Nome, email e senha são obrigatorios');
    }
  
    const userCriado = await User.findOne({ where: { email } });
    if (userCriado) {
      throw new Error('Ja existe uma conta com este email');
    }
  
    const hashPass = await bcrypt.hash(password, SALT_VALUE);
    const newUser = await User.create({
      name,
      email,
      password: hashPass,
      role,
    });
    return newUser;
  }

  async findUser(id) {
    if (!id) {
      throw new Error('Id é obrigatorio.');
    }

    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('Usuario não encontrado');
    }
    return user;
  }

  async updateUser(id, name, email, password, role) {
    const user = await this.findUser(id);

    if (email) {
      const userCriado = await User.findOne({ where: { email } });
      if (userCriado && userCriado.id !== id) {
        throw new Error('Email ja cadastrado');
      }
    }

    const updatedData = {
      name: name || user.name,
      email: email || user.email,
      password: password ? await bcrypt.hash(password, SALT_VALUE) : user.password,
      role: role || user.role,
    };

    await user.update(updatedData);
    return user;
  }

  async deleteUser(id) {
    if (!id) {
      throw new Error('Id é obrigatorio');
    }

    const user = await this.findUser(id);
    await user.destroy();
  }

  async findUsers() {
    return await User.findAll();
  }

  async loginUser(email, password) {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatorios');
    }
  
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Email ou senha invalidos');
    }
  
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    return { token, role: user.role };
  }
}

module.exports = new UserController();
