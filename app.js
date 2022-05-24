const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect");

const app = express();

// Routes Import
const pages = require("./routes/page");
const users = require("./routes/user");
const posts = require("./routes/post");
const comments = require("./routes/comment");

//ENV
require("dotenv").config();

// Middleware
app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json());

// Routes
app.use(pages);
app.use("/user", users);
app.use("/post", posts);
app.use("/comment", comments);

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
