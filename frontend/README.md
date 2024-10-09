# Projeto PokeWorld - Frontend com React

Este projeto é uma aplicação web para gerenciar Pokémons utilizando a [PokeAPI](https://pokeapi.co/). O sistema permite que usuários se cadastrem, façam login e explorem os Pokémons cadastrados. Desenvolvido com React, utiliza várias tecnologias modernas para criar uma experiência dinâmica e interativa.

## Tecnologias Utilizadas
- **React**
- **React Router**
- **JavaScript**
- **CSS**
- **Fetch API**
- **Node.js**:
- **MySQL**:
- **bcrypt**
- **Axios**
- **Styled-Components**
- **react-icons**
- **body-parser** e **cors**

## Funcionalidades
- Cadastro de usuários
- Login e autenticação de usuários
- Listagem e busca de Pokémons usando a API PokeAPI
- Interface amigável e responsiva

## Pré-requisitos

Para executar o projeto, certifique-se de ter as seguintes ferramentas instaladas:
- **Node.js**
- **MySQL**

## Banco de Dados

Antes de rodar a aplicação, certifique-se de ter um banco de dados criado com o nome **pokedex**, contendo a tabela `usuarios` com os seguintes campos:
- `name`: VARCHAR
- `email`: VARCHAR
- `password`: VARCHAR (criptografado usando bcrypt)

## Como executar o projeto

1. Clone o repositório:
   git clone https://github.com/KaueDeMoura/front-end-api

2. Acesse o diretório do projeto:
   cd front-end-api

3. Instale as dependências:
   npm install


4. Instale as dependências adicionais:
   npm install bcrypt cors express mysql react-dom react-icons react-router-dom styled-components axios body-parser


5. Inicie o servidor Node.js:
   node Server.cjs

6. Após o servidor estar em execução, inicie a aplicação React:
   npm run dev

7. Acesse o sistema e crie uma conta ou faça login.

## Como utilizar

- Navegue pela aplicação e explore os Pokémons disponíveis.
- Aproveite o sistema para explorar as funcionalidades oferecidas.
