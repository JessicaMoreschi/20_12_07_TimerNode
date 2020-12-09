
let logoIcon;
let icon;
/////////////////////////////////////////////////////////////////////////

function preload() {
  logoIcon = loadImage("./assets/logopausa.png");
  icon = loadImage("./assets/noParola.png"); //trombetta chiara
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
  image(icon, width / 2, height / 6*4.5, icon.width / 6, icon.height /6);



  //testo caratteristiche
  textFont('quicksand');
  textAlign(CENTER, TOP);
  textStyle(BOLD);

  //testo centrale
  textSize(15);
  fill('#877B85'); //4° colore PALETTE
  text('ESULTAZIONI', width / 2, height / 6*4.9);
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
