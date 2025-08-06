// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const sql = require('mssql');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 1433,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

async function queryDB(queryString, params = []) {
  try {
    const pool = await sql.connect(dbConfig);
    const request = pool.request();
    params.forEach((param, i) => {
      request.input(`param${i}`, param);
    });
    const result = await request.query(queryString);
    return result.recordset;
  } catch (error) {
    console.error('DB Query Error:', error);
    throw error;
  }
}

app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ error: 'All fields (username, password, email) are required' });
  }

  try {
    const existing = await queryDB('SELECT id FROM userdatabase WHERE username = @param0 OR email = @param1', [username, email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await queryDB(
      'INSERT INTO userdatabase (username, password, email) VALUES (@param0, @param1, @param2)',
      [username, passwordHash, email]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const users = await queryDB('SELECT * FROM userdatabase WHERE username = @param0', [username]);
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Export app and queryDB for tests or server import
module.exports = { app, queryDB };
