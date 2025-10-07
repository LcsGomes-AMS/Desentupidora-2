const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

// Configurações
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'troque_isto_para_uma_string_secreta';

// Credenciais do admin
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin2025';

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // se estiver usando HTTPS, coloque true
}));

// Middleware para checar login
function requireLogin(req, res, next) {
  if (req.session && req.session.user === ADMIN_USER) {
    return next();
  }
  return res.redirect('/login');
}

// Rota de login (formulário)
app.get('/login', (req, res) => {
  res.send(`
    <form method="POST" action="/login">
      <h2>Login</h2>
      <input name="username" placeholder="Usuário" required />
      <input name="password" placeholder="Senha" type="password" required />
      <button type="submit">Entrar</button>
    </form>
  `);
});

// Rota de login (validação)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.user = ADMIN_USER;
    return res.redirect('/');
  }
  return res.send('Credenciais inválidas. <a href="/login">Tentar novamente</a>');
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.redirect('/login');
  });
});

// Servir arquivos estáticos (CSS/JS/imagens)
app.use('/static', express.static(path.join(__dirname, 'public')));

// Rota raiz protegida (só acessível se logado)
app.get('/', requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
