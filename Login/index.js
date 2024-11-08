let spinning = false;
let rotation = 0;
let spinSpeed = 0;
let selectedLetter = "";

function initializeRoulette() {
  const canvas = document.getElementById("rouletteCanvas");
  const context = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(canvas.width, canvas.height) / 2 - 10;

  drawRouletteWheel(context, centerX, centerY, radius);
}

function spinRoulette() {
  if (spinning) return;

  spinning = true;
  rotation = 0;
  spinSpeed = Math.random() * 10 + 20;
  animateSpin();
}

function animateSpin() {
  const canvas = document.getElementById("rouletteCanvas");
  const context = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(canvas.width, canvas.height) / 2 - 10;
  spinSpeed *= 0.98;

  rotation += spinSpeed;

  context.save();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.translate(centerX, centerY);
  context.rotate((rotation * Math.PI) / 180);
  context.translate(-centerX, -centerY);
  drawRouletteWheel(context, centerX, centerY, radius);
  context.restore();
  if (spinSpeed > 0.1) {
    requestAnimationFrame(animateSpin);
  } else {
    const anglePerSlice = 360 / ALPHABET.length;
    const randomOffset = Math.random() * 360;
    const finalRotation = (rotation + randomOffset) % 360;
    const chosenIndex = Math.floor(finalRotation / anglePerSlice) % ALPHABET.length;
    selectedLetter = ALPHABET[chosenIndex];
    updateNameInput();
    spinning = false;
  }
}

function updateNameInput() {
  const nameInput = document.getElementById("nameInput");
  nameInput.value += selectedLetter;
}

function deleteLastCharacter() {
  const nameInput = document.getElementById("nameInput");
  nameInput.value = nameInput.value.slice(0, -1);
}

// Initialize roulette on load
window.onload = initializeRoulette;
