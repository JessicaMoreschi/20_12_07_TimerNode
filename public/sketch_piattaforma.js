
let socket = io(); //setting server

//VARIABILI SCKETCH
var testo = 180; //valore countdown


// RICEZIONE
socket.on("testoIn", updateTesto) //ricezione countdown

// UPDATE DA SERVER
function updateTesto(dataReceived) {
  testo = dataReceived //assegna a testo dati da server
}

// BUTTONS (EMIT AL CLICK)
function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.position(0, 0);
  //button start
  var btn;
  btn = createButton("Start Time");
  btn.position(width / 2 + 100, height / 2 - 25);
  btn.mouseClicked(function() {
    socket.emit("startTimer");  //emetti startTimer
  });
  //button stop
  var btn2;
  btn2 = createButton("Stop Time");
  btn2.position(width / 2 + 100, height / 2);
  btn2.mouseClicked(function() {
    socket.emit("stopTimer"); //emetti stopTimer
  });
  //button reset
  var btn3;
  btn3 = createButton("Reset Time");
  btn3.position(width / 2 + 100, height / 2 + 25);
  btn3.mouseClicked(function () {
    socket.emit("resetTimer");  //emetti resetTimer
  });
}

//WRITE TESTO COUNTDOWN
function draw() {
  background("255");

  push()
  textSize(20);
  fill("red");
  text(testo, width / 3, height / 2 + 15);
  pop()
}
