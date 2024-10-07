const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({message:'Não foi possivel buscar usuarios', error });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (await User.findByEmail(email)) {
      return res.status(400).json({message:'Já existe uma conta com este email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create(name, email, hashedPassword);

    res.status(201).json({message:'Usuário registrado com sucesso', user: newUser });
  } catch (error) {
    res.status(500).json({message:'Erro ao registrar usuário', error });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (role === 'Admin' && req.user.role !== 'Admin') {
    return res.status(403).json({message:'Somente Admin pode criar outro Admin' });
  }

  try {
    if (await User.findByEmail(email)) {
      return res.status(400).json({message:'Já existe uma conta com este email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create(name, email, hashedPassword, role);

    res.status(201).json({message:'Usuario criado com sucesso', user: newUser });
  } catch (error) {
    res.status(500).json({message:'Erro ao tentar criar usuário', error });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.json({message:'Usuario deletado com sucesso' });
  } catch (error) {
    res.status(500).json({message:'Erro ao tentar deletar usuario', error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({message: 'Naoooooo' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, 'secret_key', { expiresIn: '1h' });
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({message:'Erro ao fazer login', error });
  }
};

const updateUser = async (req, res) => {
  try {
    await User.update(req.params.id, req.body);
    const updatedUser = await User.findById(req.params.id);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({message:'erro ao atualizar', error });
  }
};

module.exports = { getUsers, registerUser, createUser, deleteUser, loginUser, updateUser };