const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect");

const app = express();

// Routes Import
const register = require("./routes/register");
const login = require("./routes/login");
const dashboard = require("./routes/dashboard");

//ENV
require("dotenv").config();

// Middleware
app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json());

// Routes
app.use("/register", register);
app.use("/login", login);
app.use("/dashboard", dashboard);

// Homepage (Nanti)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/html/index.html"));
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
