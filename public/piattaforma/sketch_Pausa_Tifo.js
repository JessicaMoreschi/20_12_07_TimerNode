let logoIcon;
let random_tifo;
let i;
/////////////////////////////////////////////////////////////////////////

function preload() {
  logoIcon = loadImage("./assets/immagini/logo.png");
  //benvenuto = loadImage("./assets/immagini/benvenuto.png"); //trombetta chiara
}
/////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15); //rallenta
  background('#887b86'); //scuro
  imageMode(CENTER); //per pittogrammi
  image(logoIcon, width / 2, height / 2, logoIcon.width / 7, logoIcon.height / 7);
}
/////////////////////////////////////////////////////////////////////////
function draw() {
  //CONTATORE i DEL TEMPO
  if (frameCount % 50 == 0) { //multiplo di 50 incrementa i
    i++;
  }

  random_tifo = round(random(4)); //diamo all utente 3 modi per tifare

  if (mouseIsPressed) {
    if (random_tifo == 1) {
      window.open('sciarpata/indexApertura.html', '_self');
    } else if (random_tifo == 2) {
      window.open('esultazioni/indexApertura.html', '_self');
    } else if (random_tifo == 3) {
      window.open('trombetta/indexApertura.html', '_self');
    }
  }

}

/////////////////////////////////////////////////////////////////////

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('#887b86'); //scuro
  imageMode(CENTER); //per pittogrammi
  image(logoIcon, width / 2, height / 2, logoIcon.width / 7, logoIcon.height / 7);
}
