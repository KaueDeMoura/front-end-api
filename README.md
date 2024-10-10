
# Projeto PokeWorld - Frontend e Backend

Este projeto é uma aplicação web para gerenciar Pokémons utilizando a [PokeAPI](https://pokeapi.co/). O sistema permite que usuários se cadastrem, façam login e explorem os Pokémons cadastrados. O projeto foi separado em duas partes: **frontend** e **backend**.

# Tecnologias Utilizadas

# Frontend
- React
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

# Backend
- **Node.js**
- **Express**
- **bcrypt**
- **cors**
- **jsonwebtoken**
- **mysql2**

# Funcionalidades
- Cadastro de usuários
- Login e autenticação de usuários
- Listagem e busca de Pokémons usando a API PokeAPI
- Interface amigável e responsiva

# Pré-requisitos

Para executar o projeto, certifique-se de ter as seguintes ferramentas instaladas:
- **Node.js**
- **MySQL**

# Banco de Dados

Antes de rodar a aplicação, certifique-se de ter um banco de dados criado com o nome **pokedex** e uma tabela **users** com os seguintes campos:
- **id**: INT (auto-incremento, chave primária)
- **name**: VARCHAR
- **email**: VARCHAR
- **password**: VARCHAR (criptografado usando bcrypt)
- **role**: VARCHAR (padrão 'Viewer')

# Você pode executar este script para iniciar seu banco de dados:
```bash
CREATE DATABASE IF NOT EXISTS pokeworld;
```
```bash
USE pokeworld;
```
```bash
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Viewer'
);
```

# Operações no Banco de Dados

- **findAll()**: Retorna todos os usuários da tabela `users`.
- **findById(id)**: Retorna um usuário com base no `id`.
- **findByEmail(email)**: Retorna um usuário com base no `email`.
- **create(name, email, password, role)**: Cria um novo usuário na tabela `users`.
- **update(id, updates)**: Atualiza os dados de um usuário com base no `id`.
- **delete(id)**: Deleta um usuário com base no `id`.

# Como executar o projeto

# 1. Clonar o repositório:
   ```bash
   git clone https://github.com/KaueDeMoura/front-end-api
   ```

# 2. Configurar o Backend:

1. Acesse o diretório do backend:
   ```bash
   cd front-end-api/backend
   ```

2. Instale as dependências do backend:
   ```bash
    npm install bcrypt cors express jsonwebtoken mysql2
   ```

3.Configure o banco de dados MySQL, criando as tabelas necessárias.

4. Inicie o servidor Node.js na porta 5000:
   ```bash
   node Server.js
   ```

# 3. Configurar o Frontend:

1. Acesse o diretório do frontend:
   ```bash
   cd ../frontend
   ```

2. Instale as dependências do frontend:
   ```bash
   npm install bcyrpt axios cors express body-parser
   ```

3. Inicie a aplicação React:
   ```bash
   npm run dev
   ```

### 4. Acessar o sistema:
Após iniciar o servidor backend (porta 5000) e o frontend, abra o navegador e acesse o endereço:
```
http://localhost:3000
```

- Crie uma conta ou faça login.
- Navegue pela aplicação e explore os Pokémons disponíveis.

# Conta admin
- Você pode acessar a conta admin com:
login: admin@admin.com
senha: admin

## Como utilizar

- Explore as funcionalidades oferecidas.
- Faça login, cadastre novos Pokémons e utilize o sistema para pesquisa

