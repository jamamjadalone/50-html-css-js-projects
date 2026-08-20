const canvas = document.getElementById("image-canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const input = document.getElementById("image-input");
const magnifier = document.getElementById("magnifier");
const magnifierCanvas = document.getElementById("magnifier-canvas");
const magnifierCtx = magnifierCanvas.getContext("2d");
const swatch = document.getElementById("color-swatch");
const hexValue = document.getElementById("hex-value");
const rgbValue = document.getElementById("rgb-value");
const historyList = document.getElementById("history");

const MOVE_RADIUS = 10;
const history = [];

function componentToHex(c) {
  return c.toString(16).padStart(2, "0");
}

function rgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`.toUpperCase();
}

function renderDefault() {
  ctx.fillStyle = "#242833";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#8b90a0";
  ctx.font = "20px system-ui";
  ctx.textAlign = "center";
  ctx.fillText("Upload an image to start picking colors", canvas.width / 2, canvas.height / 2);
}

function fitImage(img) {
  const maxW = 900;
  const maxH = 600;
  const scale = Math.min(1, maxW / img.width, maxH / img.height);
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function loadImage(file) {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    fitImage(img);
    URL.revokeObjectURL(url);
    swatch.textContent = "No color selected";
    swatch.style.background = "#1a1d26";
    hexValue.textContent = "---";
    rgbValue.textContent = "---";
  };
  img.onerror = () => {
    URL.revokeObjectURL(url);
  };
  img.src = url;
}

function getPixel(e) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
  const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));
  return { x, y };
}

function sampleColor(x, y) {
  const data = ctx.getImageData(x, y, 1, 1).data;
  return { r: data[0], g: data[1], b: data[2] };
}

function updateMagnifier(x, y, color, e) {
  const rect = canvas.getBoundingClientRect();
  const sx = Math.max(0, x - MOVE_RADIUS);
  const sy = Math.max(0, y - MOVE_RADIUS);
  const sw = Math.min(MOVE_RADIUS * 2, canvas.width - sx);
  const sh = Math.min(MOVE_RADIUS * 2, canvas.height - sy);

  magnifierCtx.clearRect(0, 0, magnifierCanvas.width, magnifierCanvas.height);
  magnifierCtx.imageSmoothingEnabled = true;
  magnifierCtx.drawImage(canvas, sx, sy, sw, sh, 0, 0, magnifierCanvas.width, magnifierCanvas.height);

  magnifier.classList.remove("hidden");
  const left = e.clientX - magnifier.offsetWidth / 2;
  const top = e.clientY - magnifier.offsetHeight / 2;
  const wrap = canvas.closest(".canvas-wrap");
  const wrapRect = wrap.getBoundingClientRect();
  magnifier.style.left = `${Math.min(Math.max(left - wrapRect.left, 0), wrapRect.width - magnifier.offsetWidth)}px`;
  magnifier.style.top = `${Math.min(Math.max(top - wrapRect.top, 0), wrapRect.height - magnifier.offsetHeight)}px`;

  magnifierCtx.fillStyle = color.hex;
  magnifierCtx.beginPath();
  magnifierCtx.arc(magnifierCanvas.width / 2, magnifierCanvas.height / 2, 5, 0, Math.PI * 2);
  magnifierCtx.fill();
}

function addToHistory(color) {
  history.unshift(color);
  if (history.length > 8) history.pop();
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  history.forEach((c) => {
    const li = document.createElement("li");
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.style.background = c.hex;
    const text = document.createElement("span");
    text.textContent = c.hex;
    li.appendChild(dot);
    li.appendChild(text);
    historyList.appendChild(li);
  });
}

canvas.addEventListener("mousemove", (e) => {
  if (!canvas.width) return;
  const { x, y } = getPixel(e);
  const { r, g, b } = sampleColor(x, y);
  const hex = rgbToHex(r, g, b);
  updateMagnifier(x, y, { hex }, e);
});

canvas.addEventListener("mouseleave", () => {
  magnifier.classList.add("hidden");
});

canvas.addEventListener("click", (e) => {
  if (!canvas.width) return;
  const { x, y } = getPixel(e);
  const { r, g, b } = sampleColor(x, y);
  const hex = rgbToHex(r, g, b);

  swatch.style.background = hex;
  swatch.textContent = hex;
  swatch.style.color = r * 0.299 + g * 0.587 + b * 0.114 > 150 ? "#111" : "#fff";
  hexValue.textContent = hex;
  rgbValue.textContent = `rgb(${r}, ${g}, ${b})`;

  addToHistory({ hex, rgb: `rgb(${r}, ${g}, ${b})` });
});

input.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) loadImage(file);
});

renderDefault();