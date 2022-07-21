const module = 12;
let tone;

function setup() {
  let cnv = createCanvas(windowWidth, 0.75 * windowHeight);
  cnv.mouseMoved(()=>loop());
  cnv.parent(p5banner);
  frameRate(40);
  colorMode (RGB, 255, 255, 255, 100);
  tone = color(20, 85, 230);
}

function draw() {
  background(80, 135, 255);
  pattern();
  noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, 0.75 * windowHeight);
}

function pattern() {
  for (let y = 0; y < height; y += module) {
    for (let x = 0; x < width; x += module) {
      let i = 4 * (y * width + x);
      let num = int(random(0, 90));

      if (num == 0) {
        noStroke();
        fill(tone);
        square(x, y, module, 2);
      }
      if (num == 1) {
        noFill();
        stroke(tone);
        strokeWeight(2);
        line(x - module / 2, y - module / 2, x + module / 2, y + module / 2);
        line(x - module / 2, y + module / 2, x + module / 2, y - module / 2);
      }
      if (num == 2) {
        noFill();
        stroke(tone);
        strokeWeight(2);
        square(x, y, module - module / 2, 2);
      }
      if (num == 3) {
        noStroke();
        fill(tone);
        square(x, y, module - module / 2, 2);
      }
    }
  }
}
