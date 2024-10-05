import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de sucesso no cadastro
    navigate('/login');
  };

  // Redireciona para a página de login
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
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="preencher">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="preencher">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
        <hr />
        <button type="button" className='cadastrar' onClick={handleRegisterClick}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;
