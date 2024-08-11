import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { registerUser, authenticateUser, confirmUser } from './auth.mjs';
import http from 'http'; // Hinzugefügt
import { Server as SocketIOServer } from 'socket.io'; // Hinzugefügt

dotenv.config();

const app = express();
const server = http.createServer(app); // Hinzugefügt
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Erlauben Sie alle Ursprünge
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
});

const PORT = process.env.PORT || 3002;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Registrierung
app.post('/register', (req, res) => {
  const { username, password, email, givenName, familyName, birthdate } = req.body;
  console.log('Request Body:', req.body); // Log the request body for debugging
  registerUser(username, password, email, givenName, familyName, birthdate, (err, result) => {
    if (err) {
      console.error('Fehler bei der Registrierung des Benutzers:', err); // Log the error for debugging
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Benutzer erfolgreich registriert', user: result });
  });
});

// Bestätigung
app.post('/confirm', (req, res) => {
  const { email, code } = req.body;
  console.log('Empfangene Daten:', { email, code }); // Log received data
  confirmUser(email, code, (err, result) => {
    if (err) {
      console.error('Bestätigungsfehler:', err); // Log the error for debugging
      return res.status(400).json({ message: 'Bestätigung fehlgeschlagen!', error: err.message });
    }
    res.status(200).send({ message: 'Bestätigung erfolgreich!', result });
  });
});

// Anmeldung
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Request Body:', req.body); // Log the request body for debugging
  authenticateUser(username, password, (err, result) => {
    if (err) {
      console.error('Authentifizierungsfehler:', err); // Log the error for debugging
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Benutzer erfolgreich authentifiziert', token: result.getAccessToken().getJwtToken() });
  });
});

// Socket.IO-Konfiguration
io.on('connection', (socket) => {
  console.log('Ein Benutzer hat sich verbunden');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Ein Benutzer hat sich getrennt');
  });
});

server.listen(PORT, '0.0.0.0', () => { // Bind the server to all network interfaces
  console.log(`Server läuft auf http://0.0.0.0:${PORT}`);
});
