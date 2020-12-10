//trombetta ICONE
let sciarpaIcon, sciarpaBIcon, tut1Icon, tutIcon, logor, freccia, sAlta, sBassa;; //icone
let xBarra = 20; //lunghezza barra %
let w, h; //posizione
let s = 0; //ellisse BONUS

//variabile suono trombetta
let alt = 1; //h dei rettangoli suono
let i = 0; //regola ogni quanto cambia alt
let p_coord = 0; //var coordinazione
let contBonus = 0; //conta quando p_coord arriva a 100

let feed_piattaforma = 0; //var piattaforma: quando alt!=1 viene incrementata
let input_utente = 200 //var utente usa la trobetta, preme bottone

let opacità = 210 //opacità rettangolo tutorial
let pronto //coordinzaione tutorial
let bonus_server;

//variabili per DASPO
let daspo = false; //variabile che dice se daspo è attiva in questo momento
let daspo_counter = 0; //variabile che conta il numero di daspo
let incremento_daspo = 0;
let op = 0; //opacità rettangolo daspo
let timeout_daspo;

///////////////////////////////////////////////////////////////////////////////////////////////////
// teachable machine
// https://www.npmjs.com/package/@teachablemachine/pose/v/0.8.4
// https://editor.p5js.org/shmanfredi/sketches/y6u7bz5C1
const URL = "https://storage.googleapis.com/tm-model/V-k69BewR/";

let model, capture, topPrediction, numClasses, poseData, context

async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  model = await tmPose.load(modelURL, metadataURL);
  numClasses = model.getTotalClasses();
}

async function predict() {
  const {
    pose,
    posenetOutput
  } = await model.estimatePose(capture.elt)

  const predictions = await model.predict(posenetOutput)
  let highestProbability = 0
  let highestIndex
  predictions.forEach((item, index) => {
    if (item.probability > highestProbability) {
      highestProbability = item.probability
      highestIndex = index
    }
  })

  poseData = pose
  topPrediction = predictions[highestIndex].className

}

/////////////////////////////////////////////////////////////////////////

function preload() {
  sciarpaBIcon = loadImage("./assets/immagini/sciarpa.png"); //sciarpa vuota bianca
  sciarpaIcon = loadImage("./assets/immagini/sciarpaViola.png"); //sciarpa scura
  tutIcon = loadImage("./assets/immagini/Tutorial-sciarpa-giu.gif");
  tut1Icon = loadImage("./assets/immagini/Tutorial-sciarpa-su.gif");
  logor = loadImage("./assets/immagini/logopiccolo.png"); //logo ridotto
  freccia = loadImage("./assets/immagini/freccia.png");
  sAlta = loadImage("./assets/immagini/Sciarpa_su.png");
  sBassa = loadImage("./assets/immagini/Sciarpa_giù.png");
  daspo_3 = loadImage("./assets/immagini/daspo3.gif");
  daspo_4 = loadImage("./assets/immagini/daspo4.gif");
  daspo_5 = loadImage("./assets/immagini/daspo5.gif");
}

/////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15); //rallenta

  capture = createCapture(VIDEO)
  capture.hide()
  init()
}

/////////////////////////////////////////////////////////////////////////
function draw() {
  background('#F9F9F9'); //chiaro
  imageMode(CENTER); //per pittogrammi
  noStroke();

  w = width / 20;
  h = height / 50;

  //testo caratteristiche
  textFont('quicksand');
  textAlign(CENTER, TOP);
  textStyle(BOLD);

  //testo centrale
  textSize(16);
  fill('#877B85'); //4° colore PALETTE
  text('PARTITA COOD O1', w * 10, h * 5);
  fill('#B7AEB5'); //3° PALETTE
  textSize(13);
  text('SQUADRA1-SQUADRA2', w * 10, h * 6.5);

  //testo sotto
  textSize(14);
  textAlign(CORNER);
  text('BONUS', w * 1.2, h * 43);

  //logo a destra
  image(logor, w * 18.5, h * 6, logor.width / 4.5, logor.height / 4.5);
  //freccia
  image(freccia, w, h * 6, freccia.width / 6, freccia.height / 6);

  //BARRA COORDINAZIONE
  fill('#D5D0D3'); //barra grigia
  rectMode(CENTER);
  rect(w * 10, h * 45.5, width / 3.5, 15, 20); //rect(x,y,w,h,[tl])
  if (i > 3) {
    xBarra = ((width / 3.5) / 100) * p_coord; //altezza barra %, xTot= 439 = width / 3.5
  } else {
    xBarra = 0;
  }

  push();
  rectMode(CORNER);
  fill('#877B85'); //barra viola
  //width/7 è la metà della barra, che è lunga width/3.5
  rect(w * 10 - width / 7, h * 45.5 - 7.5, xBarra, 15, 20);
  pop();

  ///////////////BONUS//////////////////////////////////////////////////////////////

  if (p_coord === 80) {
    contBonus++;
  } //console.log('BONUS CONTATOR:' + contBonus);

  //pallini BONUS
  for (let i = 0; i < 6; i++) {
    if (contBonus === 3 || contBonus === 4 || contBonus === 5) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      pop();
    } else if (contBonus === 6 || contBonus === 7 || contBonus === 8) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      ellipse(w + 25, h * 45.5, 15);
      pop();
    } else if (contBonus === 9 || contBonus === 10 || contBonus === 11 || contBonus === 12 || contBonus === 13) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      ellipse(w + 25, h * 45.5, 15);
      ellipse(w + 50, h * 45.5, 15);
      pop();
    } else if (contBonus === 14 || contBonus === 15 || contBonus === 16 || contBonus === 17 || contBonus === 18) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      ellipse(w + 25, h * 45.5, 15);
      ellipse(w + 50, h * 45.5, 15);
      ellipse(w + 75, h * 45.5, 15);
      pop();
    } else if (contBonus === 19 || contBonus === 20 || contBonus === 21) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      ellipse(w + 25, h * 45.5, 15);
      ellipse(w + 50, h * 45.5, 15);
      ellipse(w + 75, h * 45.5, 15);
      ellipse(w + 100, h * 45.5, 15);
      pop();
    } else if (contBonus === 22) {
      window.open('../bonus/index.html', '_self'); //doppio puntino per andare nella cartella sopra
    }
    ellipse(w + s, h * 45.5, 15);
    s = 25 * i;
  }
  ///////////////////////////////////////////////////////////////

  //CONTATORE i DEL TEMPO
  if (frameCount % 50 == 0) { //multiplo di 50 incrementa i
    i++
  }

  //PER LA BARRA DELLA PERCENTUALE
  if (topPrediction == 'up' && i % 2 == 0) {
    p_coord = round((feed_piattaforma * input_utente) / 100);
  } else {
    p_coord = 0;
  }
  console.log(feed_piattaforma);

  //PERCENTUALE
  push();
  textAlign(CORNER);
  fill('#B7AEB5'); //3° PALETTE
  text('COORDINAZIONE  ' + p_coord + ' %', w * 10, h * 43);
  pop();

  textSize(16);
  fill('#B7AEB5'); //3 PALETTE
  //ICONA FEEDBACK DA SEGUIRE
  if (i % 2 != 0 && i > 3) {

    image(sciarpaBIcon, w * 10, h * 25, sciarpaBIcon.width / 6, sciarpaBIcon.height / 6); //chiara
    feed_piattaforma = 0;
  } else if (i % 2 == 0 && i > 3) { //cambio colore delle bottone centrale: feedback utente
    document.getElementById("tutorial2").style.display = "none";
    image(sciarpaIcon, w * 10, h * 25, sciarpaIcon.width / 6, sciarpaIcon.height / 6); // scura
    if (topPrediction == 'up') {
      feed_piattaforma++;
    }
  }

  //rettangolo in opacità
  push();
  rectMode(CORNER)
  fill(255, 255, 255, opacità);
  rect(0, 0, width, height);
  //rettangolo diventta trasparente alla fine del tutorial
  if (i > 3) {
    opacità = 0
  }
  pop();

  //TUTORIAL sciarpa

  if (i == 0 || i == 2) {

    document.getElementById("tutorial").style.display = "block";
    document.getElementById("tutorial2").src = "./assets/immagini/Tutorial-sciarpa-giu.gif";
    document.getElementById("tutorial2").style.display = "none";
    text('Alzala quando richiesto', w * 10, h * 29.5);
    if (topPrediction == 'up') {
      text('CORRETTO', w * 10, h * 31.5);
      p_coord = 70;
    }
  } else if (i == 1 || i == 3) {
    document.getElementById("tutorial").src = "./assets/immagini/Tutorial-sciarpa-su.gif";
    document.getElementById("tutorial2").style.display = "block";
    document.getElementById("tutorial").style.display = "none";

    text('Porta in basso la sciarpa', w * 10, h * 29.5);

    if (topPrediction == 'up') {
      text('NON COORDINATO', w * 10, h * 31.5);
      p_coord = 70;
    }
  }


  // FEED UTENTE (PALLINI COLORATI)
  if (topPrediction == 'up' && i % 2 == 0) { //alza la sciarpa


    input_utente = 200;
    push();
    var z = 25 + p_coord;
    tint(255, z * 3.5); // Display at half opacity
    image(sAlta, width / 2, height / 2, sAlta.width / 3, sAlta.height / 3);
    pop();

    predict()
  } else if (topPrediction == 'up' && i % 2 != 0) { //abbassa la sciarpa
    input_utente = 0;
    image(sBassa, width / 2, height / 2, sBassa.width / 3, sBassa.height / 3);

    predict()
  } else {
    input_utente = 0;
    image(sBassa, width / 2, height / 2, sBassa.width / 3, sBassa.height / 3);

    predict()
  }



  //DASPO
  //daspo condizione
  if (topPrediction == 'up' && i % 2 != 0 && i > 3) {
    daspo = true;
    daspo_counter++;
  } else if (topPrediction == 'up' && i % 2 == 0 && i > 3 && daspo == false) {
    daspo = false;
    op = 0;
  }

  if (daspo == true) {
    daspoAttiva();
    timeout_daspo = setTimeout(daspoNonAttiva, 3000);
  }

  incremento_daspo = 3000 + daspo_counter * 1000;
  if (incremento_daspo > 5000) {
    incremento_daspo = 5000;
  }

  console.log("tempo daspo " + incremento_daspo)


//console.log (topPrediction);

///////cambio cartella //////////////////////////////////////////////////
if (i == 20) {
  window.open('../indexPausa.html', '_self'); //doppio puntino per andare nella cartella sopra
}
//////////////////////////////////////////////////////////////////
}


///////FINE DRAW/////////////////////////////////////////////////////

//funzioni per attivare la daspo
function daspoAttiva() {
  op = 210;
  daspo = true;
  push();
  rectMode(CORNER);
  fill(255, 255, 255, op);
  rect(0, 0, width, height);
  pop();

  if (incremento_daspo == 3000) {
    gif_daspo = daspo_3
  } else if (incremento_daspo == 4000) {
    gif_daspo = daspo_4
  } else if (incremento_daspo == 5000) {
    gif_daspo = daspo_5
  }


  // image(gif_daspo, width / 10, 3*height / 4, gif_daspo.width/2 , gif_daspo.height/2 );
  image(daspo_3, width / 10, 3 * height / 4, daspo_3.width / 2, daspo_3.height / 2);

}

//funzione per disattivare la daspo cambiando la variabile
function daspoNonAttiva() {
  daspo = false;
}

//riavvia il timer per daspo
function nonAttivafine() {
  clearTimeout(timeout_daspo);
}

//funzione trombetta
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
