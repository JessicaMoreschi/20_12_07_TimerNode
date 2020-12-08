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
let videoCorner;
let videoCornerStart = 175; //inizio video
let videoCornerStop = 170; //fine video Corner
let videoGoal;
let videoGoalStart = 165; //inizio video
let videoGoalStop = 160; //fine video Goal


// RICEZIONE SERVER
socket.on("startTimer", startTimer); // StartTimer
socket.on("stopTimer", stopTimer); // StopTimer
socket.on("resetTimer", resetTimer); // ResetTimer


function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.position(0, 0);

// SETUP TIMER
  var btn; //button start
  btn = createButton("Start Time");
  btn.position(width / 2 + 100, height / 2 - 25);
  btn.mouseClicked(startTimer);
  var btn2; //button stop
  btn2 = createButton("Stop Time");
  btn2.position(width / 2 + 100, height / 2);
  btn2.mouseClicked(stopTimer);
  var btn3; //button reset
  btn3 = createButton("Reset Time");
  btn3.position(width / 2 + 100, height / 2 + 25);
  btn3.mouseClicked(resetTimer);

// SETUP VIDEO
  videoAction = createVideo('assets/action.mp4');
  videoAction.hide();
  videoGoal = createVideo('assets/goal.mp4');
  videoGoal.hide();
  videoCorner = createVideo('assets/corner.mp4');
  videoCorner.hide();
}


function draw() {
  background("255");

// DISPLAY COUNTDOWN
  push()
  textSize(20);
  fill("black");
  text(testo, width / 2 + 50, height / 2 + 15);
  pop()
  if (gap < 0) {
    testo = "finish" // text fine partita
  }

//EMIT COUNTDOWN
  socket.emit("testoOut", testo);

// DISPLAY VIDEO
  if (testo < videoActionStart && testo > videoActionStop) {
    imageMode(CENTER);
    image(videoAction, 180, height / 2, 160 * 2, 100 * 2);
  }
  if (testo < videoGoalStart && testo > videoGoalStop) {
    imageMode(CENTER);
    image(videoGoal, 180, height / 2, 160 * 2, 100 * 2);
  }
  if (testo < videoCornerStart && testo > videoCornerStop) {
    imageMode(CENTER);
    image(videoCorner, 180, height / 2, 160 * 2, 100 * 2);
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
    videoGoal.pause();
    videoCorner.pause();
  //play
  } else if (playAllVideo == true) {
    if (testo < videoActionStart && testo > videoActionStop) {
      videoAction.loop() //videoAction
    };
    if ((testo < videoGoalStart && testo > videoGoalStop) ||
      (testo < videoCornerStart && testo > videoCornerStop)) {
      videoAction.pause() //videoAction
    };
    if (testo < videoGoalStart && testo > videoGoalStop) {
      videoGoal.loop() //videoGoal
    };
    if (testo < videoCornerStart && testo > videoCornerStop) {
      videoCorner.loop() //videoCorner
    };
  }
}
