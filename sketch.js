let falas = [
  { texto: "Olá! Eu sou o Felipe, \n um garoto do colegio do campo.", cena: "campo" },
  { texto: "Minha família vive no campo, \n onde plantamos milho e cuidamos dos animais.", cena: "campo" },
  { texto: "Todo mês, visitamos meus primos na cidade.", cena: "cidade" },
  { texto: "Na cidade, vejo como as pessoas \n dependem do que produzimos no campo.", cena: "cidade" },
  { texto: "E no campo, usamos tecnologia da cidade \n para melhorar nosso trabalho!", cena: "estrada" },
  { texto: "Juntos, somos uma grande equipe \n conectando o campo e a cidade!", cena: "feira" }
];

let falaAtual = 0;
let somFala;
let personagemImg;

let anguloSol = 0;
let animacaoBicho = 0;
let direcaoBicho = 1;

function preload() {
  somFala = loadSound('Wood-Snap_66fb0a7767c5c9.07580340.mp3');
  personagemImg = loadImage('fazendeiro.png');
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  drawCenario(falas[falaAtual].cena);

  // Desenha personagem
  image(personagemImg, 00, 350, 250, 250);

  // Balão de fala (semi-transparente)
  drawBalao(200, 350, falas[falaAtual].texto);

  // Botões
  drawBotoes();

  // Atualiza animações
  anguloSol += 0.02; // rotação lenta do sol
  animacaoBicho += direcaoBicho * 0.5;
  if (animacaoBicho > 5 || animacaoBicho < -5) direcaoBicho *= -1;
}

function drawCenario(tipo) {
  if (tipo === "campo") {
    background(135, 206, 250);
    
    // Sol com raios girando
    push();
    translate(700, 100);
    fill(255, 223, 0);
    ellipse(0, 0, 80);
    stroke(255, 223, 0);
    for (let i = 0; i < 360; i += 30) {
      let x1 = cos(radians(i + degrees(anguloSol))) * 50;
      let y1 = sin(radians(i + degrees(anguloSol))) * 50;
      let x2 = cos(radians(i + degrees(anguloSol))) * 70;
      let y2 = sin(radians(i + degrees(anguloSol))) * 70;
      line(x1, y1, x2, y2);
    }
    pop();
    noStroke();

    // Montanhas
    fill(100, 200, 100);
    triangle(200, 300, 300, 150, 400, 300);
    triangle(400, 300, 500, 180, 600, 300);

    // Grama
    fill(34, 139, 34);
    rect(0, 300, width, 300);

    // Fazenda cercada
    fill(139, 69, 19);
    rect(500, 350, 200, 150);
    for (let i = 500; i <= 700; i += 20) {
      rect(i, 350, 2, 150);
    }
    rect(500, 350, 200, 2);
    rect(500, 500, 200, 2);

    // Bichinhos animados
    fill(255, 255, 255);
    ellipse(550, 450 + animacaoBicho, 20); // ovelha pulando
    fill(255, 192, 203);
    ellipse(600, 450 - animacaoBicho, 20); // porquinho pulando
    fill(255, 215, 0);
    triangle(650, 450 + animacaoBicho, 660, 470 + animacaoBicho, 640, 470 + animacaoBicho); // galinha pulando
  } else if (tipo === "cidade") {
    background(188,143,143)
    for (let i = 50; i < width; i += 100) {
      fill(169, 169, 169);
      rect(i, height / 2 - 200, 60, 200);
      fill(255);
      for (let j = height / 2 - 180; j < height / 2; j += 40) {
        rect(i + 10, j, 15, 15);
      }
    }
    fill(50);
    rect(0, height / 2, width, 100);
    for (let i = 0; i < width; i += 40) {
      fill(255, 255, 0);
      rect(i, height / 2 + 45, 20, 10);
    }
  } else if (tipo === "estrada") {
    for (let y = 0; y < height / 2; y++) {
      stroke(210, 180, 140 - y / 2);
      line(0, y, width, y);
    }
    noStroke();
    fill(139, 69, 19);
    triangle(150, 300, 250, 150, 350, 300);
    triangle(400, 300, 500, 180, 600, 300);
    fill(50);
    rect(0, height / 2, width, 100);
    for (let i = 0; i < width; i += 40) {
      fill(255, 255, 0);
      rect(i, height / 2 + 45, 20, 10);
    }
    for (let i = 80; i < width; i += 150) {
      fill(139, 69, 19);
      rect(i, height / 2 - 50, 10, 50);
      fill(34, 139, 34);
      ellipse(i + 5, height / 2 - 60, 40);
    }
  } else if (tipo === "feira") {
    background(255, 228, 181);
    for (let i = 150; i < width - 150; i += 150) {
      fill(255, 0, 0);
      rect(i, height / 2, 100, 100);
      fill(255, 255, 255);
      triangle(i, height / 2, i + 50, height / 2 - 50, i + 100, height / 2);
    }
    for (let i = 150; i < width - 150; i += 30) {
      fill(random(255), random(255), random(255));
      triangle(i, 200, i + 15, 220, i + 30, 200);
    }
  }
}

function drawPersonagem(x, y) {
  image(personagemImg, x, y, 150, 150);
}

function drawBalao(x, y, texto) {
  fill(255, 255, 255, 180); // semi-transparente
  stroke(0);
  rect(x - 200, y - 60, 400, 120, 10);
  triangle(x - 50, y + 60, x - 30, y + 60, x - 40, y + 80);
  noStroke();
  fill(0);
  textSize(18);
  text(texto, x, y);
}

function drawBotoes() {
  fill(200);
  rect(250, 500, 100, 40, 10);
  rect(450, 500, 100, 40, 10);
  fill(0);
  textSize(16);
  text("Anterior", 300, 520);
  text("Próximo", 500, 520);
}

function mousePressed() {
  if (mouseX > 250 && mouseX < 350 && mouseY > 500 && mouseY < 540) {
    falaAtual--;
    if (falaAtual < 0) falaAtual = 0;
    somFala.play();
  }
  if (mouseX > 450 && mouseX < 550 && mouseY > 500 && mouseY < 540) {
    falaAtual++;
    if (falaAtual >= falas.length) falaAtual = falas.length - 1;
    somFala.play();
  }
}
