function setup() {
  createCanvas(1000, 1000);
  background(250);
}

function draw() {
  drawArcs(random(width), random(height), random(10, 70))

  if (frameCount == 10) {
    noLoop();

  }
}

function drawArcs(x, y, layers) {
  push()
  translate(x, y)
  noFill();
  strokeWeight(0.5);
  for (let i = 0; i < layers; i++) {
    let r = i * 10;
    arc(0, 0, r, r, random(TWO_PI / 8), random(TWO_PI));
  }

  pop();
}
