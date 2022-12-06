require("dotenv").config();
const express = require("express");
const app = express();
const server = require('http').Server(app)
const io = require("socket.io")(server, {
  cors: {
    origin: '*',
  }
});
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());


io.on("connection", socket => {
  console.log("Someone joined with id : ", socket.id)
  socket.on("new-message", (message) => {
    socket.broadcast.emit('receive-message', message);
  })
});

mongoose.connect(process.env['ATLAS']);
const connection = mongoose.connection;

connection.on(
  "error",
  console.error.bind(console, "Error connecting to database")
);

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/api", require("./Routes/api"));

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
