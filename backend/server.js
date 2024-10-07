// backend/server.js

const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const User = require('./src/models/User'); 
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

const createAdminUser = async () => {
    const adminEmail = 'admin@admin.com';
    const adminPassword = 'admin'; 
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    try {
        const existingAdmin = await User.findByEmail(adminEmail); 

        if (!existingAdmin) {
            await User.create('Admin', adminEmail, hashedPassword, 'Admin'); 
            console.log('Usuário adm criado com sucesso');
        } else {
            console.log('Usuário adm já existe');
        }
    } catch (error) {
        console.error('Erro ao criar usuário adm', error);
    }
};


const startServer = async () => {
    await createAdminUser();
    app.listen(port, () => {
        console.log(`rodando ${port}`);
    });
};

startServer();
