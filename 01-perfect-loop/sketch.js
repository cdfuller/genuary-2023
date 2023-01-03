function setup() {
  createCanvas(800, 800);
  // pixelDensity(1)
}

let rotation = 0;

function draw() {
  background(40);

  const ROTATIONS = 10;
  push()
  translate(width / 2, height / 2);
  rotate(rotation);

  noFill();
  stroke(255);
  strokeWeight(40)
  beginShape();
  let r = 0;
  for (let theta = 0; theta < TWO_PI * ROTATIONS; theta += TWO_PI / 100) {
      let x = cos(theta) * r;
      let y = sin(theta) * r;
      vertex(x, y);

      r += 1;
  }
  endShape();
  pop();

  rotation -= 0.01;
}