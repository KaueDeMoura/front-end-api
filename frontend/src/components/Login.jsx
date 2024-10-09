import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);  
        localStorage.setItem('role', data.role); 
        navigate('../sobre'); 
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao realizar login');
    }
  };
  

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
        <hr />
        <button type="button" className="cadastrar" onClick={RegisterClick}>
          Criar nova conta
        </button>
      </form>
    </div>
  );
};

export default Login;
