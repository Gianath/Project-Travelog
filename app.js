const path = require('path');
const express = require('express');
const register = require('./routes/register');

const app = express();

app.use(express.static('./public'));
app.use(express.json());

app.use('/register', register);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/html/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/html/login.html'));
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
