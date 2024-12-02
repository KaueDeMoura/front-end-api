import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminCrudPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Viewer',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://pokeworld-back.onrender.com/api/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Falha ao buscar os usuários:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar os usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await fetch(`https://pokeworld-back.onrender.com/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://pokeworld-back.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const addedUser = await response.json();
        setUsers([...users, addedUser]);
        setNewUser({ name: '', email: '', password: '', role: 'Viewer' });
        window.location.reload();
      } else {
        console.error('Falha ao adicionar o usuário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar o usuário:', error);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://pokeworld-back.onrender.com/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(editingUser),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setEditingUser(null); 
      } else {
        console.error('Falha ao editar o usuário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao editar o usuário:', error);
    }
  };

  const startEditing = (user) => {
    setEditingUser(user);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">PokeWorld Admin Page</h1>
        <nav>
          <button type="button" className="cadastrar" onClick={() => handleNavigation('/sobre')}>Sobre</button>
          <button type="button" className="cadastrar" onClick={() => handleNavigation('/pokedex')}>Pokedex</button>
          <button type="button" className="cadastrar" onClick={() => handleNavigation('/itens')}>Itens</button>
          <button type="button" className="cadastrar" onClick={() => handleNavigation('/sobreNos')}>Sobre Nos</button>
          <button type="button" className="cadastrar" onClick={() => handleNavigation('/admin/crud')}>Admin Page</button>
        </nav>
      </header>

      <h1>Admin: Gerenciar Usuários</h1>

      <form onSubmit={editingUser ? updateUser : addUser} className="form">
        <h2>{editingUser ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</h2>
        <label>
          Nome:
          <input
            type="text"
            value={editingUser ? editingUser.name : newUser.name}
            onChange={(e) => editingUser
              ? setEditingUser({ ...editingUser, name: e.target.value })
              : setNewUser({ ...newUser, name: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={editingUser ? editingUser.email : newUser.email}
            onChange={(e) => editingUser
              ? setEditingUser({ ...editingUser, email: e.target.value })
              : setNewUser({ ...newUser, email: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Senha:
          <input
            type="password"
            value={editingUser ? editingUser.password : newUser.password}
            onChange={(e) => editingUser
              ? setEditingUser({ ...editingUser, password: e.target.value })
              : setNewUser({ ...newUser, password: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Função:
          <select
            value={editingUser ? editingUser.role : newUser.role}
            onChange={(e) => editingUser
              ? setEditingUser({ ...editingUser, role: e.target.value })
              : setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <br />
        <button type="submit">{editingUser ? 'Atualizar Usuário' : 'Adicionar Usuário'}</button>
      </form>

      {users.length > 0 ? (
        <table border="1" className="tableUsuarios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Função</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => deleteUser(user.id)}>Excluir</button>
                  <button onClick={() => startEditing(user)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum usuário encontrado</p>
      )}

<style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: white;
            height: 100%;
            overflow-y: auto;
            background-image: none;
          }

          .app {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
          }

          .header {
            width: 100%;
            background-color: #ffcc01;
            padding: 10px 0;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
          }

          .title {
            font-size: 36px;
            color: #333;
            margin: 0;
          }

          header nav {
            display: flex;
            justify-content: center;
            gap: 15px;
          }

          .cadastrar {
            padding: 10px 20px;
            border-radius: 15px;
            background-color: #007bff;
            color: white;
            font-size: 16px;
            transition: background-color 0.3s ease;
          }

          header button:hover {
            background-color: #0056b3;
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
            button{
            margin: 5px;
            }

          .tableUsuarios {
            margin-top: 40px;
            width: 70%;
            border-collapse: collapse;
            margin-bottom: 40px;
          }

          .tableUsuarios th, .tableUsuarios td {
            border: 1px solid #333;
            padding: 10px;
          }

          .tableUsuarios th {
            background-color: #007bff;
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default AdminCrudPage;
