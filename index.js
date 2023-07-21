require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 4000;
const io = socketIO(httpServer);

app.use(cors());

const usersDB = {};

io.on("connection", (socket) => {
  socket.on("username", (username) => {
    const userId = socket.id;
    usersDB[userId] = username;
    io.emit("userConnected", `${username} connected`);
  });

  socket.on("uploadMessage", (msg) => {
    const userId = socket.id;
    io.emit("downloadMessage", `${userId} ${msg}`);
  });

  socket.on("disconnect", () => {
    const userId = socket.id;
    io.emit("userDisconnected", `${usersDB[userId]} disconnected`);
    delete usersDB[userId];
  });
});

httpServer.listen(port, () => {
  console.log(`💻 Server listening on port ${port} (http://localhost:${port})`);
});
