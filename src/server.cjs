const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '--',
  database: 'pokedex'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao MySQL');
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const query = 'INSERT INTO usuarios (name, email, password) VALUES (?, ?, ?)';

  db.query(query, [name, email, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ msg: 'Usuário cadastrado com sucesso!', userId: result.insertId });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM usuarios WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (results.length === 0) {
      return res.status(401).send({ message: 'Usuário não encontrado!' });
    }

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);

    if (isMatch) {
      res.send({ msg: 'Login bem-sucedido!' });
    } else {
      res.status(401).send({ message: 'Senha incorreta!' });
    }
  });
});

app.listen(2000, () => {
  console.log('Servidor rodando na porta 2000');
});
