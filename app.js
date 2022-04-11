const express = require('express');
const app = express();

app.use('/assets', express.static('./public/assets'));
app.use('/css', express.static('./public/css'));
app.use(express.static('./public/html'));
app.use(express.json());

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
