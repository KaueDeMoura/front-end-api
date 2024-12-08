import React, { useState, useEffect } from 'react';

const AlterarDados = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://pokeworld-backend.onrender.com/api/users/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({ ...data, password: '' });
        } else {
          console.error('Falha ao buscar dados do usuário:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://pokeworld-backend.onrender.com/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('Dados atualizados com sucesso!');
      } else {
        console.error('Falha ao atualizar os dados:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
    }
  };

  return (
    <div className="app">
      <h1>Alterar Dados</h1>
      <form onSubmit={handleUpdate} className="form">
        <label>
          Nome:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Senha:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Salvar Alterações</button>
      </form>

      <style>
        {`
          .app {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
          }

          .form {
            margin: 20px 0;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            width: 400px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }

          .form label {
            display: block;
            margin: 10px 0;
          }

          button {
            padding: 10px 20px;
            border-radius: 15px;
            background-color: #007bff;
            color: white;
            font-size: 16px;
            transition: background-color 0.3s ease;
          }

          button:hover {
            background-color: #0056b3;
          }
        `}
      </style>
    </div>
  );
};

export default AlterarDados;
