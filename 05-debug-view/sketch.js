let values;
let t = 0;
const AMPLITUDE = 300;

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  // background(51);
  background(51);

  stroke(220)
  strokeWeight(2);
  line(0, height/2, width, height/2);

  push()
  translate(0, height/2);

  // values = generateSinSignal(width);
  values = generateNoiseSignal(width);

  noFill();

  fill(0, 220, 0, 15);
  drawVoltagesAsSin(values)
  strokeWeight(0.4)
  fill(220, 0, 0, 15);
  drawVoltagesAsSquare(values)
  // noLoop();
}

function drawVoltagesAsSin(values) {
  beginShape();
  values.forEach(v => {
    let x = v.s;
    let y = sin(v.v) * AMPLITUDE;

    vertex(x, y);
  });

  vertex(width, height/2);
  vertex(0, height/2);

  endShape();
}

function drawVoltagesAsSquare(values) {
  beginShape();
  vertex(0, 0);
  values.forEach(v => {
    let x = v.s;
    let y = (sin(v.v) > 0 ? 0 : 1) * -AMPLITUDE;

    vertex(x, y);
  });

  vertex(width, 0);
  endShape();
}

function generateSinSignal(valueCount) {
  let values = [];
  let signal = 0;
  const PHASES = 10;
  for (let x = 0; x < valueCount; x++) {
    let v = sin(signal)
    values.push({s: x, v: v});
    signal += PHASES * TWO_PI / valueCount;
  }

  return values;
}

function generateNoiseSignal(valueCount) {
  let values = [];
  let signal = 0;

  // noiseDetail(2, 0.4)

  for (let x = 0; x < valueCount; x++) {
    let v = (noise(signal, t) - 0.5) * 2;
    values.push({s: x, v: v});

    signal += 0.01;
  }

  t += 0.001;
  return values; 
}
