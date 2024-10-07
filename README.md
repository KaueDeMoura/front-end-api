# Projeto PokeWorld - Frontend e Backend

Este projeto é uma aplicação web para gerenciar Pokémons utilizando a [PokeAPI](https://pokeapi.co/). O sistema permite que usuários se cadastrem, façam login e explorem os Pokémons cadastrados. O projeto foi separado em duas partes: **frontend** e **backend**.

## Tecnologias Utilizadas

### Frontend
- **React**
- **React Router**
- **JavaScript**
- **CSS**
- **Fetch API**
- **Axios**
- **Styled-Components**
- **react-icons**
- **react-router-dom**
- **bcrypt**
- **body-parser**
- **cors**
- **express**
- **mysql**
- **npm**

### Backend
- **Node.js**
- **Express**
- **bcrypt**
- **cors**
- **jsonwebtoken**
- **mysql2**

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

Antes de rodar a aplicação, certifique-se de ter um banco de dados criado com o nome **pokedex**, contendo a tabela **usuarios** com os seguintes campos:
- **name**: VARCHAR
- **email**: VARCHAR
- **password**: VARCHAR (criptografado usando bcrypt)

## Como executar o projeto

### 1. Clonar o repositório:
```bash
git clone https://github.com/KaueDeMoura/front-end-api
```

### 2. Configurar o Backend:

1. Acesse o diretório do backend:
   ```bash
   cd front-end-api/backend
   ```

2. Instale as dependências do backend:
   ```bash
   npm install
   ```

3. Configure o banco de dados MySQL, criando as tabelas necessárias.

4. Inicie o servidor Node.js:
   ```bash
   node Server.js
   ```

### 3. Configurar o Frontend:

1. Acesse o diretório do frontend:
   ```bash
   cd ../frontend
   ```

2. Instale as dependências do frontend:
   ```bash
   npm install
   ```

3. Inicie a aplicação React:
   ```bash
   npm run dev
   ```

### 4. Acessar o sistema:
Após iniciar o servidor backend e o frontend, abra o navegador e acesse o endereço:
```
http://localhost:3000
```

- Crie uma conta ou faça login.
- Navegue pela aplicação e explore os Pokémons disponíveis.

## Como utilizar

- Explore as funcionalidades oferecidas.
- Faça login, cadastre novos Pokémons e utilize o sistema para pesquisa e gerenciamento de Pokémons.
