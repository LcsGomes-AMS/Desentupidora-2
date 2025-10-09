const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose(); // ✅ IMPORTANTE
const app = express();

// cria (ou abre) o banco local
const db = new sqlite3.Database(path.join(__dirname, "banco.db"), (err) => {
  if (err) {
    console.error("Erro ao abrir o banco:", err);
  } else {
    console.log("Banco de dados conectado com sucesso!");
  }
});
