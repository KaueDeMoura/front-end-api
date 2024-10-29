import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userImage from '../imgs/iconuser.png';
import kaueFoto from '../imgs/kaue.jpg';
import fabricioFoto from '../imgs/fabricio.jpg';

function SobreNos() {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const logout = () => {
    localStorage.clear('token');
    navigate('/login');
  };

  const alterarDados = () => {
    navigate('/alterarDados');
  };

  return (
    <div className="sobre-nos">
      <header className="header">
        <nav>
          <button type="button" className="cadastrar" onClick={() => handleNavigation('/sobre')}>
            Sobre
          </button>
          <button type="button" className="cadastrar" onClick={() => handleNavigation('/pokedex')}>
            Pokedex
          </button>
          <button type="button" className="cadastrar" onClick={() => handleNavigation('/itens')}>
            Itens
          </button>
          <button type="button" className="cadastrar" onClick={() => handleNavigation('/sobreNos')}>
            Sobre Nós
          </button>
          <button type="button" className="cadastrar" onClick={() => handleNavigation('/admin/crud')}>
            Admin Page
          </button>
          <div className="user-profile" onClick={toggleDropdown}>
            <img src={userImage} alt="Usuário" className="user-image" />
            {dropdownVisible && (
              <div className="dropdown-menu">
                <button onClick={alterarDados}>Alterar Dados</button>
                <button onClick={logout}>Desconectar</button>
              </div>
            )}
          </div>
        </nav>
      </header>
      
      <div className="cards-container">
        <div className="card">
          <img src={kaueFoto} alt="Foto sua" className="card-img" />
          <div className="card-body">
            <h3 className="card-title">Kauê O. de Moura</h3>
            <p>Olá! Nasci em Curitiba, atualmente tenho 19 anos. Fiz o ensino médio no Instituto Federal
                de Araquari, onde realizei o ensino médio e o técnico integrado em informática. Atualmente 
                estou realizando o curso de Análise e Desenvolvimento de Sistemas na Faculdade Senac e trabalhando
                na empresa SoftExpert.
            </p>
          </div>
        </div>
        <div className="card">
          <img src={fabricioFoto} alt="Foto do amigo" className="card-img" />
          <div className="card-body">
            <h3 className="card-title">Fabrício C. Correia</h3>
            <p>Olá! Nasci em Joinville, atualmente tenho 19 anos. Fiz o ensino médio na Escola Annes Gualberto, 
              onde realizei o ensino médio. Atualmente estou realizando o curso de Análise e Desenvolvimento de 
              Sistemas na Faculdade Senac.
            </p>
          </div>
        </div>
      </div>

      <style>
        {`
          .sobre-nos {
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
          }

          .header {
            width: 100%;
            background-color: #ffcc01;
            padding: 10px 0;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .title {
            font-size: 36px;
            margin-left: 20px;
          }

          .header nav {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-left: 10%
          }

          .cadastrar {
            padding: 10px 20px;
            border-radius: 15px;
            background-color: #007bff;
            color: white;
            font-size: 16px;
            transition: background-color 0.3s ease;
          }

          .user-profile {
            position: relative;
            cursor: pointer;
          }

          .user-image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }

          .dropdown-menu {
            position: absolute;
            top: 50px;
            right: 0;
            background-color: #ffcc01;
            border: 1px solid #ddd;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }

          .dropdown-menu button {
            padding: 10px;
            font-size: 16px;
            background: none;
            border: none;
            text-align: left;
            cursor: pointer;
            width: 100%;
          }

          .dropdown-menu button:hover {
            background-color: #f5f5f5;
          }

          .cards-container {
            margin-top: 45px;
            display: flex;
            justify-content: center;
            gap: 20px;
          }
          
          .card {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 8px;
            width: 300px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .card-img {
            width: 100%;
            height: auto;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
          }
          
          .card-body {
            padding: 15px;
          }

          .card-title {
            margin: 0 0 10px;
            font-size: 22px;
            color: #555;
          }
          
          .card-body p {
            margin: 5px 0;
            font-size: 16px;
            color: #666;
          }
        `}
      </style>
    </div>
  );
}

export default SobreNos;
