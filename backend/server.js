const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const sequelize = require('./src/config/database'); 
const User = require('./src/models/User'); 
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

const pokemonApi = require('./src/api/pokemon');

app.get('/pokemons', pokemonApi.listarPokemons);
app.get('/itens', pokemonApi.listarItens);
app.post('/pokemons', pokemonApi.criarPokemon);
app.put('/pokemons/:id', pokemonApi.atualizarPokemon);
app.delete('/pokemons/:id', pokemonApi.deletarPokemon);


const createAdminUser = async () => {
    const adminEmail = 'admin@admin.com';
    const adminPassword = 'admin'; 
    const hashPass = await bcrypt.hash(adminPassword, 10);

    try {
        const existingAdmin = await User.findOne({ where: { email: adminEmail } });

        if (!existingAdmin) {
            await User.create({ 
                name: 'Admin', 
                email: adminEmail, 
                password: hashPass, 
                role: 'Admin' 
            });
            console.log('Usuário Admin criado com sucesso');
        } else {
            console.log('Usuário Admin já existe');
        }
    } catch (error) {
        console.error('Erro ao criar usuário Admin:', error);
    }
};

const startServer = async () => {
    try {
        await sequelize.sync({ alter: true });
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados bem-sucedida.');
        await sequelize.sync({ alter: true }); 
        console.log('Banco de dados sincronizado.');

        await createAdminUser();

        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
    }
};

startServer();