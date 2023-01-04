// use bitmasks for choosing colors to shift
// https://levelup.gitconnected.com/bit-masking-in-javascript-831eb26f04a3
const RED = 0x001;
const GREEN = 0x010;
const BLUE = 0x100;

let form = document.getElementById("image-form");
let imageObject;

form.addEventListener("submit", event => {
  event.preventDefault()
  console.log(event);

  let file = event.target.elements['file-input'].files[0];
  let fileURL = URL.createObjectURL(file);
  imageObject = loadImage(fileURL, img => {
    console.log(img);
    loadImageToCanvas(img);
  })
});

function setup() {
  createCanvas(1024, 1024);
  pixelDensity(1);
  background(220);
  imageObject = loadImage("source/always_curious_digital_bee_flat_ink_drawing_7bb130b8-e2f8-4beb-88b9-c619a8494ab6.png", img => {
    image(img, 0, 0);
  })
  frameRate(2);
}

function draw() {
  randomGlitch();

  if (frameCount == 20) {
    noLoop();
  }
}

function loadImageToCanvas(img) {
  resizeCanvas(img.width, img.height);
  image(img, 0, 0);
  frameCount = 0;
  loop();
}

function glitchCanvasOrig() {
  loadPixels();

  let cutImage = get(100, 100, 100, 100);
  cutImage.loadPixels();
  let cutPixels = cutImage.pixels;

  let startX = 150;
  let startY = 100;

  for (let y = 0; y < 100; y++) {
    let tY = startY + y;
    for (let x = 0; x < 100; x++) {
      let tX = startX + x;
      let tI = ((tY * width) + tX) * 4;

      let sI = ((y * 100) + x) * 4;
      pixels[tI + 0] = cutPixels[sI + 0]
      pixels[tI + 1] = pixels[sI + 1]
      pixels[tI + 2] = pixels[sI + 2]
    }
  }

  updatePixels();
}

function randomGlitch() {
  let x = Math.floor(random(width * 0.9));
  let y = Math.floor(random(height * 0.9));
  let w = Math.floor(random(width * 0.4));
  let h = Math.floor(random(height * 0.4));
  let hShift = Math.floor(random(-width / 3, width / 3))
  let vShift = Math.floor(random(-height / 3, height / 3))

  let flags = 0;
  flags |= random([0, RED, RED])
  flags |= random([0, GREEN, GREEN])
  flags |= random([0, BLUE, BLUE])

  console.log({x, y, w, h, hShift, vShift, flags})
  glitchCanvas(x, y, w, h, hShift, vShift, flags);
}

function glitchCanvas(sourceX, sourceY, w, h, horizontalShift, verticalShift, colorFlags) {
  loadPixels();

  let cutImage = get(sourceX, sourceY, w, h);
  cutImage.loadPixels();
  let cutPixels = cutImage.pixels;

  let startX = sourceX + horizontalShift;
  let startY = sourceY + verticalShift;

  for (let y = 0; y < h; y++) {
    let tY = startY + y;
    for (let x = 0; x < w; x++) {
      let tX = startX + x;
      let tI = ((tY * width) + tX) * 4;

      let sI = ((y * w) + x) * 4;
      let r = colorFlags & RED ? cutPixels[sI + 0] : pixels[tI + 0];
      let g = colorFlags & GREEN ? cutPixels[sI + 1] : pixels[tI + 1];
      let b = colorFlags & BLUE ? cutPixels[sI + 2] : pixels[tI + 2];
      pixels[tI + 0] = r;
      pixels[tI + 1] = g;
      pixels[tI + 2] = b;
    }
  }

  updatePixels();
}

