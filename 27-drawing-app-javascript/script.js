const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("color-picker");
const brushSize = document.getElementById("brush-size");
const sizeValue = document.getElementById("size-value");
const eraserBtn = document.getElementById("eraser-btn");
const clearBtn = document.getElementById("clear-btn");

let drawing = false;
let erasing = false;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const ratio = canvas.width / canvas.height || 1;
  const temp = ctx.getImageData(0, 0, canvas.width, canvas.height);
  canvas.width = rect.width;
  canvas.height = rect.width / ratio;
  ctx.putImageData(temp, 0, 0);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function getPosition(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function startDraw(e) {
  drawing = true;
  const { x, y } = getPosition(e);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.strokeStyle = erasing ? "#ffffff" : colorPicker.value;
  ctx.lineWidth = erasing ? brushSize.value * 2 : brushSize.value;
  ctx.lineTo(x, y);
  ctx.stroke();
}

function draw(e) {
  if (!drawing) return;
  const { x, y } = getPosition(e);
  ctx.lineTo(x, y);
  ctx.stroke();
}

function stopDraw() {
  drawing = false;
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseleave", stopDraw);

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  startDraw(e.touches[0]);
});
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  draw(e.touches[0]);
});
canvas.addEventListener("touchend", stopDraw);

brushSize.addEventListener("input", () => {
  sizeValue.textContent = brushSize.value;
});

eraserBtn.addEventListener("click", () => {
  erasing = !erasing;
  eraserBtn.classList.toggle("active", erasing);
});

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
