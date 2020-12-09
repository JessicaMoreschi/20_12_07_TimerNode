
let logoIcon;
let tIcon;
/////////////////////////////////////////////////////////////////////////

function preload() {
  logoIcon = loadImage("./assets/immagini/logopausa.png");
  tIcon = loadImage("./assets/immagini/trombetta.png"); //trombetta chiara
}
/////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(12); //rallenta
}
/////////////////////////////////////////////////////////////////////////
function draw() {
  background('#F9F9F9'); //chiaro
  imageMode(CENTER); //per pittogrammi
  image(logoIcon,  width/2 , height / 2, logoIcon.width/7, logoIcon.height/7);

  push();
  fill('#F9F9F9');
  stroke('#877B85');
  strokeWeight(3);
  ellipse(width / 2, height/ 6*4.5, 70); //cerchio centrale
  image(tIcon, width / 2, height / 6*4.5, tIcon.width / 2.5, tIcon.height / 2.5);
  pop();


  //testo caratteristiche
  textFont('quicksand');
  textAlign(CENTER, TOP);
  textStyle(BOLD);

  //testo centrale
  textSize(15);
  fill('#877B85'); //4° colore PALETTE
  text('TROMBETTA', width / 2, height / 6*4.9);
  textSize(13);
  fill('#B7AEB5'); //3 PALETTE
  text('PREPARATI A TIFARE', width / 2, height / 6*5.1 );



if(mouseIsPressed){
   window.open('index.html','_self');
}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
