import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { registerUser } from './auth.js';

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.post('/register', (req, res) => {
  const { username, password, email, givenName, familyName, birthdate } = req.body;
  console.log('Request Body:', req.body); // Log the request body for debugging
  registerUser(username, password, email, givenName, familyName, birthdate, (err, result) => {
    if (err) {
      console.error('Error registering user:', err); // Log the error for debugging
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'User registered successfully', user: result });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
