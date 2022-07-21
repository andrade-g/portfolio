const poly = [];
const raio = 8;

let vid1, vid2;
let tone;
let played, hit;
let partcl = [];
let patcl_created;

function setup() {
  poly[0] = createVector(160, 600);
  poly[1] = createVector(172, 335);
  poly[2] = createVector(310, 275);
  poly[3] = createVector(280, 180);
  poly[4] = createVector(290, 80);
  poly[5] = createVector(375, 25);
  poly[6] = createVector(480, 80);
  poly[7] = createVector(480, 180);
  poly[8] = createVector(455, 270);
  poly[9] = createVector(615, 340);
  poly[10] = createVector(615, 600);
  let myCanvas = createCanvas(800, 600);
  myCanvas.parent("pic-container");
  rectMode(CENTER);
  strokeCap(ROUND);

  partcl_created = false;
  played = false;
  hit = false;
  tone = color(20);
  vid1 = createVideo("./video-site-pt1.mp4");
  vid2 = createVideo("./video-site-pt2.mp4");
  vid1.volume(0);
  vid2.volume(0);
  vid1.size(800, 600);
  vid2.size(800, 600);
  vid1.hide();
  vid2.hide();
  vid1.play();
  vid1.noLoop();
  start = false;
}

function draw() {
  background(255);

  if (played == false) {
    vid1.loadPixels();
    pattern(vid1);
    vid1.onended(() => {
      vid1.stop();
      played = true;
      vid2.loop();
    });
  } else {
    noFill();
    circle(mouseX, mouseY, 40); // Cursor
    stroke(tone);

    if (hit == false) {
      vid2.loadPixels();
      pattern(vid2);
      hit = collidePointPoly(mouseX, mouseY, poly);
    } else {
      if (partcl_created == false) {
        vid2.loadPixels();
        cria_partcl();
        partcl_created = true;
        vid2.stop();
      }

      for (let i = 0; i < partcl.length; i++) {
        partcl[i].move();
        partcl[i].show();
        partcl[i].avoidMouse();
      }

      if (mouseIsPressed) {
        for (let i = 0; i < partcl.length; i++) {
          if (partcl[i].pos != (partcl[i].Ox, partcl[i].Oy)) {
            partcl[i].gravity();
          }
        }
      }
    }
  }
}

// Cria diferentes tipos de partículas baseado no brilho da imagem
function cria_partcl() {
  for (let y = 0; y < height; y += raio) {
    for (let x = 0; x < width; x += raio) {
      let i = 4 * (y * width + x);
      let cor = color(vid2.pixels[i], vid2.pixels[i + 1], vid2.pixels[i + 2]);
      let brilho = brightness(cor);
      if (brilho > 5) {
        if (brilho <= 35) {
          partcl.push(new Partcls(x / 2, y / 2, 1, raio));
        }
        if (brilho > 35 && brilho < 60) {
          partcl.push(new Partcls(x / 2, y / 2, 2, raio));
        }
        if (brilho >= 60 && brilho < 92) {
          partcl.push(new Partcls(x / 2, y / 2, 3, raio));
        }
        if (brilho >= 92) {
          partcl.push(new Partcls(x / 2, y / 2, 4, raio));
        }
      }
    }
  }
}
