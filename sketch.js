const poly = [];
const raio = 11;

let vid1, vid2;
let tone;
let inplace, hit;
let partcl = [];
let patcl_created;

// function preload() {
//   vid2 = createVideo("./video-site-pt2.mp4");
// }

function setup() {
  let myCanvas = createCanvas(800, 600);
  vid2 = createVideo("./video-site-pt2.mp4");
  myCanvas.parent("pic-container");
  rectMode(CENTER);
  strokeCap(ROUND);

  partcl_created = false;
  inplace = 0;
  hit = false;
  tone = color(20);
  vid2.volume(0);
  vid2.size(800, 600);
  vid2.hide();
  start = false;
}

function draw() {
  background(255);
  if (hit == false) {
    vid2.loadPixels();
    vid2.loop();
    pattern(vid2);
    if (window.scrollY > 100) {
      hit = true;
      vid2.stop();
      print("exploded");
      cria_partcl();

      for (let i = 0; i < partcl.length; i++) {
        partcl[i].move();
        partcl[i].show();
        partcl[i].explode();
      }
    }
  } else {
    for (let i = 0; i < partcl.length; i++) {
      partcl[i].move();
      partcl[i].show();
    }

    if (window.scrollY <= 100) {
      for (let i = 0; i < partcl.length; i++) {
        if (partcl[i].pos != (partcl[i].Ox, partcl[i].Oy)) {
          partcl[i].gravity();
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
