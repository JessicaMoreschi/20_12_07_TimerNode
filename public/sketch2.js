// SERVER
let socket = io(); //setting server
// SKETCH
var testo = 0; //variabile testo other countdown

// SERVER
socket.on("connect", newConnection); //quando mi connetto, chiama funzione newConnection
socket.on("testoIn", otherTesto) //ricezione other coundown

function newConnection() {
  console.log("your ID: " + socket.id) //mostra mio codice connessione
}

// SKETCH
function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.position(0, 0);

  //button start
  var btn;
  btn = createButton("Start Time");
  btn.position(width / 2 + 100, height / 2 - 25);
  btn.mouseClicked(startTimer);
  //button stop
  var btn2;
  btn2 = createButton("Stop Time");
  btn2.position(width / 2 + 100, height / 2);
  btn2.mouseClicked(stopTimer);
  //button reset
  var btn3;
  btn3 = createButton("Reset Time");
  btn3.position(width / 2 + 100, height / 2 + 25);
  btn3.mouseClicked(resetTimer);
}


function draw() {
  background("255");
  //other page countdown
  push()
  textSize(20);
  textFont('Roboto Mono');
  textAlign(CENTER);
  fill("red");
  text(testo, width / 3, height / 2 + 15);
  pop()
}


//emetti comandi bottone
function startTimer() {
  socket.emit("startTimer");
}
function stopTimer() {
  socket.emit("stopTimer");
}
function resetTimer() {
  socket.emit("resetTimer");
}

//assegna a testo dati da server
function otherTesto(data) {
  testo = data
}
