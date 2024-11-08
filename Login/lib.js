const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function drawRouletteWheel(context, centerX, centerY, radius) {
  const angleIncrement = (2 * Math.PI) / ALPHABET.length;
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  ALPHABET.forEach((letter, i) => {
    const angle = i * angleIncrement;
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, angle, angle + angleIncrement);
    context.lineTo(centerX, centerY);
    context.fillStyle = i % 2 === 0 ? "#859F3D" : "#1A1A19";
    context.fill();
    context.strokeStyle = "#000";
    context.stroke();
    context.save();

    context.translate(
      centerX + (radius / 2) * Math.cos(angle + angleIncrement / 2),
      centerY + (radius / 2) * Math.sin(angle + angleIncrement / 2)
    );
    context.rotate(angle + angleIncrement / 2 + Math.PI / 2);
    context.fillStyle = "#FFF";
    context.font = "16px Arial";
    context.fillText(letter, -context.measureText(letter).width / 2, 0);
    context.restore();
  });
}
