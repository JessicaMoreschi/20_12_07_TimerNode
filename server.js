// SERVER
console.log("node is running")
// crea local server
let express = require("express");
let socket = require("socket.io");
let app = express();
let port = 3000;
let server = app.listen(port);
app.use(express.static("public"));
//crea connessione input/output
let io = socket(server)
io.on("connection", newConnection) //esegui quando un client si connette


// RICEZIONE/INVIO (from 1 client to all)
function newConnection(socket) {

  socket.on("testoOut", function(dataReceived) { // testo coundown
    socket.broadcast.emit("testoIn", dataReceived)
  });
  socket.on("startTimer", function() { // start timer
    socket.broadcast.emit("startTimer")
  });
  socket.on("stopTimer", function() { // reset timer
    socket.broadcast.emit("stopTimer")
  });
  socket.on("resetTimer", function() { // stop timer
    socket.broadcast.emit("resetTimer")
  });

  //* aggiungi qui i messaggi per farli rimbalzare a tutti
}
