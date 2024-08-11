import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mysql from 'mysql';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Hilfsfunktionen, um __dirname und __filename in ES-Modulen zu verwenden
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// MySQL-Datenbankverbindung herstellen
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Express-Server einrichten
const app = express();
const port = process.env.PORT || 5000;

// Proxy für React-App
app.use('/', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));

// API-Endpunkte hinzufügen, falls benötigt
app.get('/api/test', (req, res) => {
  connection.query('SELECT NOW()', (err, results) => {
    if (err) {
      res.status(500).send('Error executing query');
      return;
    }
    res.send(`Current time from database: ${results[0]['NOW()']}`);
  });
});

// Statische Dateien aus dem 'build'-Verzeichnis der React-App servieren
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Server starten
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
