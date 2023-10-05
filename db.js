// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Use ':memory:' para um banco de dados em memória

db.serialize(() => {
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      nome TEXT,
      rg TEXT,
      email TEXT,
      telefone TEXT
    )
  `);
});

module.exports = db;
