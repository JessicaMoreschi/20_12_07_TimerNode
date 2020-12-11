// VAR SERVER
let socket = io(); //setting server
// VAR TIMER
var x; //setInterval
var countDown;
var gap; //gap tra countDown e Now
var runningTime = 180; //secondi che scorrono
var thisTime = 180; //secondi allo stopTimer
var testo = 180; //variabile testo this countdown

var playAllVideo = false; //bouleana play/stop countdown
let videoAction;
let videoActionStart = 150; //inizio video Action
let videoActionStop = 0; //fine video Action
let videoGoal;
let videoGoalStart = 181; //inizio video
let videoGoalStop = 166; //fine video Goal
let videoCorner;
let videoCornerStart = 165; //inizio video
let videoCornerStop = 150; //fine video Corner
var myCanvas


// RICEZIONE SERVER
socket.on("startTimer", startTimer); // StartTimer
socket.on("stopTimer", stopTimer); // StopTimer
socket.on("resetTimer", resetTimer); // ResetTimer


function setup() {
  myCanvas = createCanvas(windowWidth/100*49.5, windowHeight/100*49.5);
  myCanvas.parent('videoView');
  background("#b1a4af");

// SETUP VIDEO
  videoAction = createVideo('assets/action.mp4');
  videoAction.hide();
  videoCorner = createVideo('assets/corner.mp4');
  videoCorner.hide();
  videoGoal = createVideo('assets/goal.mp4');
  videoGoal.hide();
}


function draw() {
// DISPLAY COUNTDOWN
  document.getElementById("countDown").innerHTML = testo+"'";

  if (gap < 0) {
    testo = "finish" // text fine partita
  }

//EMIT COUNTDOWN
  socket.emit("testoOut", testo);

// DISPLAY VIDEO
  if (testo < videoActionStart && testo > videoActionStop) {
    imageMode(CENTER);
    noStroke();
    image(videoAction, width/2, height/2, width/10*9.3, height/10*11);
  }
  if (testo < videoGoalStart && testo > videoGoalStop) {
    imageMode(CENTER);
    noStroke();
    image(videoCorner, width/2, height/2, width/10*9.3, height/10*11);
  }
  if (testo < videoCornerStart && testo > videoCornerStop) {
    imageMode(CENTER);
    noStroke();
    image(videoGoal, width/2, height/2, width/10*9.3, height/10*11);
  }

// PLAY/STOP VIDEO
  toggleVid(); //check funzione play/stop
}

//FUNCTION PLAY-STOP-RESET TIMER
function startTimer() {
  countDown = new Date().getTime() + (thisTime * 1000); //imposta countdown da var thisTime
  x = setInterval(function() { // Update the count down every 1 second
    var now = new Date().getTime(); // Get today's date and time
    gap = countDown - now; // Find the gap between now and the count down date
    runningTime = Math.floor((gap / 1000)); // Time calculations for seconds
    testo = runningTime //setta variabile time
  }, 1000);
  playAllVideo = true; //lega video al timer
}
function stopTimer() {
  clearInterval(x); //blocca countdown
  thisTime = runningTime; //registra secondo allo stop
  testo = thisTime; //visualizza secondo allo stop
  countDown = new Date().getTime() + (thisTime * 1000); //+1000=+1s
  playAllVideo = false; //lega video al timer
}
function resetTimer() {
  clearInterval(x); //blocca countdown
  thisTime = 180; //resetta countdown
  testo = thisTime; //visualizza countdown
  countDown = new Date().getTime() + (thisTime * 1000); //+1000=+1s
  playAllVideo = false; //lega video al timer
}

// FUNCTION LINK VIDEO A TIMER
function toggleVid() {
  //stop
  if (playAllVideo == false) {
    videoAction.pause();
    videoCorner.pause();
    videoGoal.pause();
    //play
  } else if (playAllVideo == true) {
    if (testo < videoActionStart && testo > videoActionStop) {
      videoAction.play();
    };
    if ((testo < videoGoalStart && testo > videoGoalStop) ||
      (testo < videoCornerStart && testo > videoCornerStop)) {
      videoAction.pause() //videoAction
    };
    if (testo < videoGoalStart && testo > videoGoalStop) {
      videoCorner.play() //videoGoal
    };
    if (testo < videoCornerStart && testo > videoCornerStop) {
      videoGoal.play() //videoCorner
    };
  }
}

//FUNCTION IFRAME TIFO/STAT
function funIframe(url) {
  document.getElementById("iframe").setAttribute("src", url);

  if (url == "/piattaforma/index.html") {
    document.getElementById("tifo").style.background = 'rgba(214,209,211,0.25)';
    document.getElementById("tifo").style.fontWeight = 'bold';
    document.getElementById("stat").style.background = '#f9f9f8';
    document.getElementById("stat").style.fontWeight = 'regular';
  } else if (url == "statistiche.html") {
    document.getElementById("stat").style.background = 'rgba(214,209,211,0.25)';
    document.getElementById("stat").style.fontWeight = 'bold';
    document.getElementById("tifo").style.background = '#f9f9f8';
    document.getElementById("tifo").style.fontWeight = 'regular';
  }
}

//FUNCTION SUBMENU STAT
function funImgLoad(url) {
  document.getElementById("canvasStat").setAttribute("src", url);
  if (url == "/assets/cronaca.png") {
    document.getElementById("cronaca").style.borderBottomWidth = '1.5px';
    document.getElementById("datipartita").style.borderBottomWidth = '0.5px';
    document.getElementById("statistiche").style.borderBottomWidth = '0.5px';
    document.getElementById("formazione").style.borderBottomWidth = '0.5px';
    document.getElementById("cronaca").style.fontWeight = 'bold';
    document.getElementById("datipartita").style.fontWeight = 'normal';
    document.getElementById("statistiche").style.fontWeight = 'normal';
    document.getElementById("formazione").style.fontWeight = 'normal';
  } else if (url == "/assets/datipartita.png") {
    document.getElementById("cronaca").style.borderBottomWidth = '0.5px';
    document.getElementById("datipartita").style.borderBottomWidth = '1.5px';
    document.getElementById("statistiche").style.borderBottomWidth = '0.5px';
    document.getElementById("formazione").style.borderBottomWidth = '0.5px';
    document.getElementById("cronaca").style.fontWeight = 'normal';
    document.getElementById("datipartita").style.fontWeight = 'bold';
    document.getElementById("statistiche").style.fontWeight = 'normal';
    document.getElementById("formazione").style.fontWeight = 'normal';
  } else if (url == "/assets/stat.png") {
    document.getElementById("cronaca").style.borderBottomWidth = '0.5px';
    document.getElementById("datipartita").style.borderBottomWidth = '0.5px';
    document.getElementById("statistiche").style.borderBottomWidth = '1.5px';
    document.getElementById("formazione").style.borderBottomWidth = '0.5px';
    document.getElementById("cronaca").style.fontWeight = 'normal';
    document.getElementById("datipartita").style.fontWeight = 'normal';
    document.getElementById("statistiche").style.fontWeight = 'bold';
    document.getElementById("formazione").style.fontWeight = 'normal';
  } else if (url == "/assets/formazione.png") {
    document.getElementById("cronaca").style.borderBottomWidth = '0.5px';
    document.getElementById("datipartita").style.borderBottomWidth = '0.5px';
    document.getElementById("statistiche").style.borderBottomWidth = '0.5px';
    document.getElementById("formazione").style.borderBottomWidth = '1.5px';
    document.getElementById("cronaca").style.fontWeight = 'normal';
    document.getElementById("datipartita").style.fontWeight = 'normal';
    document.getElementById("statistiche").style.fontWeight = 'normal';
    document.getElementById("formazione").style.fontWeight = 'bold';
  }
}

function fullScreen() {
  myCanvas = createCanvas(windowWidth / 10 * 7.5, windowHeight / 10 * 7.5);
  myCanvas.position(windowWidth / 7.95, 0);
  myCanvas.parent('fullScreen');
  document.getElementById("fullScreen").style.display = 'block';
  document.getElementById("startBtn").style.position = 'absolute';
  document.getElementById("startBtn").style.zIndex = '1';
  document.getElementById("startBtn").style.display = 'flex';
  document.getElementById("startBtn").style.height = 'auto';
  document.getElementById("startBtn").style.top = '20%';
  document.getElementById("startBtn").style.left = '2%';
  document.getElementById("stopBtn").style.position = 'absolute';
  document.getElementById("stopBtn").style.zIndex = '1';
  document.getElementById("stopBtn").style.display = 'flex';
  document.getElementById("stopBtn").style.height = 'auto';
  document.getElementById("stopBtn").style.top = '20%';
  document.getElementById("stopBtn").style.left = '5%';
  document.getElementById("resetBtn").style.position = 'absolute';
  document.getElementById("resetBtn").style.zIndex = '1';
  document.getElementById("resetBtn").style.display = 'flex';
  document.getElementById("resetBtn").style.height = 'auto';
  document.getElementById("resetBtn").style.top = '20%';
  document.getElementById("resetBtn").style.left = '8%';
  document.getElementById("x").style.display = 'flex';
  document.getElementById("x").style.position = 'absolute';
  document.getElementById("x").style.zIndex = '1';
  document.getElementById("x").style.display = 'flex';
  document.getElementById("x").style.height = 'auto';
  document.getElementById("x").style.top = '20%';
  document.getElementById("x").style.right = '2.5%';
}

function smallScreen() {
  myCanvas = createCanvas(windowWidth/100*49.5, windowHeight/100*49.5);
  myCanvas.parent('videoView');
  myCanvas.position(0,windowHeight/100*43.25);
  background("#b1a4af");
  document.getElementById("x").style.display = 'none';
  document.getElementById("fullScreen").style.display = 'none';
  document.getElementById("startBtn").style.position = 'static';
  document.getElementById("startBtn").style.zIndex = '1';
  document.getElementById("startBtn").style.display = 'inline-block';
  document.getElementById("startBtn").style.height = '50%';
  document.getElementById("startBtn").removeAttribute("style.top");
  document.getElementById("startBtn").removeAttribute("style.left");
  document.getElementById("stopBtn").style.position = 'static';
  document.getElementById("stopBtn").style.zIndex = '1';
  document.getElementById("stopBtn").style.display = 'inline-block';
  document.getElementById("stopBtn").style.height = '50%';
  document.getElementById("stopBtn").removeAttribute("style.top");
  document.getElementById("stopBtn").removeAttribute("style.left");
  document.getElementById("resetBtn").style.position = 'static';
  document.getElementById("resetBtn").style.zIndex = '1';
  document.getElementById("resetBtn").style.display = 'inline-block';
  document.getElementById("resetBtn").style.height = '50%';
  document.getElementById("resetBtn").removeAttribute("style.top");
  document.getElementById("resetBtn").removeAttribute("style.left");
}

function emitTimer(data){
  socket.emit(data);
}

function windowResized() {
  resizeCanvas(windowWidth / 100 * 49, windowHeight / 100 * 49)
}
