import React from 'react';
import { useNavigate } from 'react-router-dom';

import kaueFoto from './imgs/kaue.jpg'; 
import fabricioFoto from './imgs/fabricio.jpg'; 

function SobreNos() {
  const navigate = useNavigate(); 

  const handleNavigation = (path) => {
    navigate(path);
  };

  const adminpage = () => {
    navigate('/admin/crud');
  };
  
  return (
    <div className="sobre-nos">
      <header className="header">
        <h1 className="title">SOBRE NÓS</h1>
        <nav>
          <button type="button" className='nav-button' onClick={() => handleNavigation('/sobre')}>
            Sobre
          </button>
          <button type="button" className='nav-button' onClick={() => handleNavigation('/pokedex')}>
            Pokedex
          </button>
          <button type="button" className='nav-button' onClick={() => handleNavigation('/itens')}>
            Itens
          </button>
          <button type="button" className='nav-buton' onClick={adminpage}>
            Admin Page
          </button>
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
            <p>Olá! Nasci em Joinville, atualmente tenho 19 anos. Fiz o ensino médio na Escola annes Gualberto, 
              onde realizei o ensino médio. Atualmente estou realizando o curso de Análise e Desenvolvimento de 
              Sistemas na Faculdade Senac.</p>
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
            text-align: center;
            margin-bottom: 20px;
          }

          .title {
            font-size: 32px;
            color: #333;
            margin: 0;
          }

          .header nav {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 10px;
          }

          .nav-button {
            padding: 10px 20px;
            border-radius: 15px;
            background-color: #007bff;
            color: white;
            font-size: 16px;
            transition: background-color 0.3s ease;
            border: none;
          }

          .nav-button:hover {
            background-color: #0056b3;
          }

          .cards-container {
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
