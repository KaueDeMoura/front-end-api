import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:2000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        setSuccessMessage('Usuário cadastrado com sucesso!');
        setTimeout(() => navigate('/login'), 2000); // Redireciona após 2 segundos para exibir a mensagem
      } else {
        const result = await response.json();
        setErrorMessage(result.message || 'Erro ao criar conta');
      }
    } catch (error) {
      setErrorMessage('Erro ao conectar com o servidor');
    }
  };

  // Redireciona para a página de login 
  const handleRegisterClick = () => {
    navigate('/login');
  };
//
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
        <button type="button" className='cadastrar' onClick={handleRegisterClick}>
          Login
        </button>
        {successMessage && <p className="successMessage">{successMessage}</p>}
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Register;
