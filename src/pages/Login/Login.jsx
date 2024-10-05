import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redireciona para a página inicial diretamente
    navigate('../sobre');
  };

  // Se clicar em registrar vai pra página de registro
  const RegisterClick = () => {
    navigate('/registrar');
  };

  return (
    <div className="containerLogin">
      <form onSubmit={handleSubmit}>
        <div className="preencher">
          <h2>Login</h2>
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
        <button type="submit">Login</button>
        <hr />
        <button type="button" className='cadastrar' onClick={RegisterClick}>
          Criar nova conta
        </button>
      </form>
    </div>
  );
};

export default Login;
