const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const requireDir = require("require-dir");

const enviromnent = process.env.NODE_ENV;
const stage = require("./config")[enviromnent];

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
  if (io.nsps["/"].adapter.rooms) console.log("conn");
});

// DBConnect
mongoose.connect("mongodb://localhost:27017/nodejsexpress", {
  useNewUrlParser: true
});
requireDir("./models");

// Middlewares
app.use(cors());
app.use((req, res, next) => {
  req.io = io;
  return next();
});
app.use(express.json());
app.use("/api", require("./routes"));

// Port listen
server.listen(stage.port, () => {
  console.log("Server running :)");
});
