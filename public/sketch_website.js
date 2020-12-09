// VAR SERVER
let socket = io(); //setting server
// VAR TIMER
var x; //setInterval
var countDown;
var gap; //gap tra countDown e Now
var runningTime = 0; //secondi che scorrono
var thisTime = 180; //secondi allo stopTimer
var testo = 180; //variabile testo this countdown

var playAllVideo = false; //bouleana play/stop countdown
let videoAction;
let videoActionStart = 180; //inizio video Action
let videoActionStop = 0; //fine video Action
let videoGoal;
let videoGoalStart = 165; //inizio video
let videoGoalStop = 160; //fine video Goal
let videoCorner;
let videoCornerStart = 175; //inizio video
let videoCornerStop = 170; //fine video Corner


// RICEZIONE SERVER
socket.on("startTimer", startTimer); // StartTimer
socket.on("stopTimer", stopTimer); // StopTimer
socket.on("resetTimer", resetTimer); // ResetTimer


function setup() {
  var myCanvas = createCanvas(windowWidth/100*49.5, windowHeight/100*49.5);
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

function funIframe(url){
  document.getElementById("iframe").setAttribute("src",url);
}

function windowResized(){
  resizeCanvas(windowWidth/100*49, windowHeight/100*49)
}
