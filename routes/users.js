// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         rg:
 *           type: string
 *         email:
 *           type: string
 *         telefone:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operações de usuário
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Sucesso
 */
router.post('/users', (req, res) => {
  const { nome, rg, email, telefone } = req.body;
  db.run('INSERT INTO users (nome, rg, email, telefone) VALUES (?, ?, ?, ?)', [nome, rg, email, telefone], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Implemente as rotas PUT e DELETE aqui

module.exports = router;
