import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:2000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Redireciona para a página inicial ou outra página após o login bem-sucedido
        navigate('/sobre');
        //
      } else {
        const result = await response.json();
        setErrorMessage(result.message || 'Erro ao fazer login');
      }
    } catch (error) {
      setErrorMessage('Erro ao conectar com o servidor');
    }
  };
// Se clicar em registar vai pra paragina de registro
  const handleRegisterClick = () => {
    navigate('/registrar');
  };
//
  return (
    <div className="containerLogin">
      
      <form onSubmit={handleSubmit}>
        <div className="preencher">
        <h2>Login</h2>
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
        <button type="submit">Login</button>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <hr />
        <button type="button" className='cadastrar' onClick={handleRegisterClick}>
          Criar nova conta
        </button>
      </form>
    </div>
  );
};

export default Login;
