
let icon;
let w, h, s; //posizione
/////////////////////////////////////////////////////////////////////////

function preload() {
  icon = loadImage("./assets/line.png");
}
/////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(12); //rallenta
}
/////////////////////////////////////////////////////////////////////////
function draw() {
  background('#887b86');//scuro
  imageMode(CENTER); //per pittogrammi
  w = width / 20;
  h = height / 50;

  image(icon, width / 2, height / 2, icon.width / 6, icon.height /6);
  //testo caratteristiche
  textFont('quicksand');
  textAlign(CENTER, TOP);
  textStyle(BOLD);

  //testo centrale
    textSize(27);
    fill('#f9f9f8'); //4° colore PALETTE
    text('Buon Tifo,', w*10, height / 50 *13);

    fill('#d6d1d3'); //3° PALETTE
    text('hai sbloccato un bonus',w*10,  height / 50 *15);
    textSize(13);
    text('BONUS',w*10,  h*44);

push();
    //CONTENITORI PAROLE VECCHE
    rectMode(CENTER);
    stroke('#d6d1d3')
    strokeWeight(5);
    fill('#887b86')
    rect(w * 6, h*31, w * 3, 60, 40);
    rect(w * 14, h*31, w * 3, 60, 40);
    //nuova parola
    stroke('#f9f9f8')
    rect(w * 10 , h*31, w * 3, 60, 40);
pop();

    noStroke();
    textSize(30);
    textAlign(CENTER, TOP);
    fill('#d6d1d3');
    text('forza.', w * 6, h*31 - 15);
    text('bravi.', w * 14, h*31 - 15);
    fill('#f9f9f8');
    text('oppla.', w * 10, h*31 - 15);


  //pallini BONUS
  ellipseMode(CENTER)
  noStroke();
  fill('#d6d1d3');
  for (let i = 0; i < 6; i++) {
        ellipse(w*9 + s, h * 42, 15);
    s = 30 * i;
  }

if(mouseIsPressed){
   window.open('indexPausa.html','_self');
}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
