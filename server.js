// SERVER
console.log("node is running")

// crea local server
let express = require("express"); //Load the express code
let socket = require("socket.io"); //Load the socket package
let app = express(); //create local host
let port = 3000; //dichiara server port (3000 standard)
let server = app.listen(port); //aspetta che qualcuno si connetta (da browser "localhost:3000")

//mostra ai clienti "public"
app.use(express.static("public"));

//crea connessione input/output
let io = socket(server) //crea connessione input (da cliente to server)
io.on("connection", newConnection) //all'evento "connection" esegui "newConnection()"

//esegui quando c'è un client
function newConnection(socket) {
  console.log("new connection: " + socket.client.id) //mostra codice connessione cliente

// SKETCH
  socket.on("testoOut", function(dataReceived) {  //alla ricezione testoOut
    socket.broadcast.emit("testoIn", dataReceived) //emetti il messaggio a tutti
  });
}
