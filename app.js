const path = require("path");
const express = require("express");

const app = express();

app.use(express.static("./public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/html/index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/html/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/html/register.html"));
});

app.post("/register/api", (req, res) => {
  console.log(req.body);
  res.json({ status: "success", name: req.body.name, email: req.body.email });
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
