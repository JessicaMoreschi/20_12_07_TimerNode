// SERVER
let socket = io(); //setting server
// SKETCH
var x; //setInterval
var countDown;
var gap; //gap tra countDown e Now
var runningTime = 0; //secondi che scorrono
var thisTime = 180; //secondi allo stopTimer
var testo = 0; //variabile testo this countdown
var testo2 = 0; //variabile testo other countdown

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
  //this countdown
  push()
  textSize(20);
  textFont('Roboto Mono');
  textAlign(CENTER);
  fill("black");
  text("this countdown:", width / 2, height / 2);
  text(testo, width / 2, height / 2 + 25);
  pop()
  //other page countdown
  push()
  textSize(20);
  textFont('Roboto Mono');
  textAlign(CENTER);
  fill("red");
  text("other countdown:", width / 3, height / 2);
  text(testo2, width / 3, height / 2 + 25);
  pop()
  // text fine partita
  if (gap < 0) {
    testo = "finish"
  }
  //invia this countdown
  socket.emit("testoOut", testo);
}


function startTimer() {
  countDown = new Date().getTime() + (thisTime * 1000); //imposta countdown da var thisTime
  // Update the count down every 1 second
  x = setInterval(function() {
    var now = new Date().getTime(); // Get today's date and time
    gap = countDown - now; // Find the gap between now and the count down date
    runningTime = Math.floor((gap / 1000)); // Time calculations for seconds
    testo = runningTime //setta variabile time
  }, 1000);
}

function stopTimer() {
  clearInterval(x); //blocca countdown
  thisTime = runningTime; //registra secondo allo stop
  testo = thisTime; //visualizza secondo allo stop
  countDown = new Date().getTime() + (thisTime * 1000); //+1000=+1s
}

function resetTimer() {
  clearInterval(x); //blocca countdown
  thisTime = 180; //resetta countdown
  testo = thisTime; //visualizza countdown
  countDown = new Date().getTime() + (thisTime * 1000); //+1000=+1s
}


//assegna a testo2 dati da server
function otherTesto(data) {
  testo2 = data
}
