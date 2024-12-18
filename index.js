const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Verifica e cria a pasta 'uploads' se não existir
const uploadDir = path.join(__dirname, 'Uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('Pasta uploads criada.');
}

// Usando as funções nativas do Express para análise de JSON e URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importando as rotas de produtos
const produtosRoutes = require('./routes/produtos.routes');
app.use('/produtos', produtosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
