let cX, cY;
let pX, pY;
let v1, v2;

const MAX_MAG = 600 / 2;

function setup() {
  createCanvas(1000, 1000);
  background(51);
  blendMode(ADD)
  // background(255);
}

function draw() {
  push();
  translate(width/2, height/2);

  const STEPS = 100;
  for (let r = width; r > 0; r -= STEPS) {
    drawRandomTriangle(r);
  }
  // drawRandomTriangle(200)
  // drawRandomTriangle(150)
  // drawRandomTriangle(100)

  noLoop();
}

function getRandomCirclePoint(radius) {
  let t = random(TWO_PI);
  return getCirclePoints(t, radius);
}

function getCirclePoints(theta, radius) {
  return {
    x: cos(theta) * radius,
    y: sin(theta) * radius
  }
}

function drawRandomTriangle(radius, color) {
  noFill();
  // ellipse(0, 0, radius * 2);
  let p1 = getRandomCirclePoint(radius);
  let p2 = getRandomCirclePoint(radius);
  let p3 = getRandomCirclePoint(radius);

  drawTriangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
}

function drawTriangle(x1, y1, x2, y2, x3, y3) {
  // noFill();
  let palette = ['cyan', 'magenta', 'yellow']
  palette = palette.concat(['red', 'green', 'blue'])
  fill(random(palette))
  triangle(x1, y1, x2, y2, x3, y3);
  drawExtendedLine(createVector(x1, y1), createVector(x2, y2))
  drawExtendedLine(createVector(x2, y2), createVector(x3, y3))
  drawExtendedLine(createVector(x3, y3), createVector(x1, y1))
}

function vectorLine(v1, v2) {
  line(v1.x, v1.y, v2.x, v2.y);
}

function vectorPoint(v, label) {
  fill('black');
  text(label, v.x + 10, v.y - 10);
  fill('red')
  ellipse(v.x, v.y, 10, 10);
}

function mousePressed() {
  console.log({mouseX, mouseY});
}

function drawExtendedLine(v1, v2) {
  let direction = p5.Vector.sub(v2, v1);
  direction.div(2);
  let centerPoint = p5.Vector.add(v1, direction);
  direction.setMag(MAX_MAG);

  vectorLine(centerPoint, p5.Vector.add(centerPoint, direction))
  direction.mult(-1)
  vectorLine(centerPoint, p5.Vector.add(centerPoint, direction))
}