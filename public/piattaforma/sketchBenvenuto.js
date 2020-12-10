
let logoIcon, benvenuto;
let pag=0;
let button;

/////////////////////////////////////////////////////////////////////////

function preload() {
  logoIcon = loadImage("./assets/immagini/logo.png");
  benvenuto = loadImage("./assets/immagini/benvenuto.png"); //trombetta chiara
}
/////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#887b86');//scuro
  imageMode(CENTER); //per pittogrammi
  image(logoIcon,  width/2 , height / 2, logoIcon.width/7, logoIcon.height/7);
  }
/////////////////////////////////////////////////////////////////////////
function mouseClicked() {
  if (pag == 0) {
    background('#F9F9F9'); //chiaro
    image(benvenuto, width / 2, height / 50*28, benvenuto.width / 6, benvenuto.height / 6);
  //testo caratteristiche
  textFont('quicksand');
  textAlign(CENTER, TOP);
  textStyle(BOLD);

  //testo centrale
  textSize(27);
  fill('#877B85'); //4° colore PALETTE
  text('Benvenuto,', width/2, height / 50 *13);
  fill('#B7AEB5'); //3° PALETTE
  text('Dodicesimo Uomo',width / 2,  height / 50 *15);
  textSize(13);
  text('IL VERO TIFO',width / 2,  height / 50 *39);
  button= createButton('inizia');
  button.position(width/2-button.width/2,  height / 50*44);
  button.mousePressed();
  } else if (pag == 1) {
      window.open('indexPausa.html','_self');
      }
      pag++;
  }
  /////////////////////////////////////////////////////////////////////

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('#887b86');//scuro
  imageMode(CENTER); //per pittogrammi
  image(logoIcon,  width/2 , height / 2, logoIcon.width/7, logoIcon.height/7);
}
