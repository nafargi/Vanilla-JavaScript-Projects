const audio = document.getElementById('audio');
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const audioSource = audioCtx.createMediaElementSource(audio);
const analyser = audioCtx.createAnalyser();

// Connect the nodes: audio -> analyser -> output
audioSource.connect(analyser);
analyser.connect(audioCtx.destination);

// Configure analyser
analyser.fftSize = 256; // Determines frequency resolution
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function drawVisualizer() {
  requestAnimationFrame(drawVisualizer);
  
  // Get frequency data
  analyser.getByteFrequencyData(dataArray);

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  // Draw bars based on frequency data
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];

    const r = barHeight + 95;
    const g = 50;
    const b = 150;

    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight *5);

    x += barWidth + 1;
  }
}

// Start visualizer when audio plays
audio.onplay = () => {
  audioCtx.resume();
  drawVisualizer();
};


let mic, fft;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0);
  let spectrum = fft.analyze();

  noStroke();
  fill(0, 255, 0); // Green bars
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h);
  }
}
