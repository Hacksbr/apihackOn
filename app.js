// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { swaggerUi, specs } = require('./swagger');
const userRoutes = require('./routes/users');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Rotas
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api', userRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
