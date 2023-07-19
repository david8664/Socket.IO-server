const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require ('cors')

const app = express();
const httpServer = createServer(app);
const io = new Server (httpServer)
app.use (cors())

io.on("connection", (socket) => {
  console.log ("User Connected")
  socket.on ('disconnect', ()=> {
    console.log ("User Disconnected")
  })
});




httpServer.listen(4000,()=> console.log ('Server is Up 🖥️'));

// let users = {
//   socket.id:name
// }
// users.sohrfoihwrfiohwofhw.name