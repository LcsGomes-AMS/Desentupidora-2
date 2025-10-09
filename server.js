// server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 3000;




const app = express();


// Middlewares
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // serve arquivos da pasta public

// Rota raiz - serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
