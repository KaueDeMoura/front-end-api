// Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao realizar cadastro');
    }
  };

  const handleRegisterClick = () => {
    navigate('/login');
  };

  return (
    <div className="containerRegister">
      <form onSubmit={handleSubmit}>
        <div className="preencher">
          <h2>Criar Conta</h2>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="preencher">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="preencher">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
        <hr />
        <button type="button" className="cadastrar" onClick={handleRegisterClick}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;
