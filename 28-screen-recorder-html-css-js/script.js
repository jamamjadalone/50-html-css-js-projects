const statusEl = document.getElementById("status");
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const stopBtn = document.getElementById("stop-btn");
const downloadBtn = document.getElementById("download-btn");
const preview = document.getElementById("preview");
const errorEl = document.getElementById("error");

let mediaRecorder = null;
let recordedChunks = [];
let stream = null;
let timerInterval = null;
let elapsedSeconds = 0;

function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
}

function clearError() {
  errorEl.classList.add("hidden");
}

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function startTimer() {
  elapsedSeconds = 0;
  timerEl.textContent = formatTime(0);
  timerInterval = setInterval(() => {
    elapsedSeconds += 1;
    timerEl.textContent = formatTime(elapsedSeconds);
  }, 1000);
}

async function startRecording() {
  clearError();
  recordedChunks = [];

  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: { cursor: "always" },
      audio: false
    });
  } catch (err) {
    if (err.name === "NotAllowedError") {
      showError("Screen sharing was denied. Please allow screen selection to record.");
    } else {
      showError("Unable to capture your screen. Please try again.");
    }
    return;
  }

  preview.srcObject = stream;
  await preview.play().catch(() => {});

  mediaRecorder = new MediaRecorder(stream, {
    mimeType: pickMimeType()
  });

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) recordedChunks.push(e.data);
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    preview.srcObject = null;
    preview.src = url;
    preview.muted = true;
    stream.getTracks().forEach((track) => track.stop());

    downloadBtn.onclick = () => {
      const a = document.createElement("a");
      a.href = url;
      a.download = `recording-${Date.now()}.webm`;
      a.click();
    };

    downloadBtn.disabled = false;
    startBtn.disabled = false;
    statusEl.textContent = "Recording finished. Download your video below.";
    statusEl.classList.remove("recording");
  };

  mediaRecorder.start();
  startTimer();

  startBtn.disabled = true;
  pauseBtn.disabled = false;
  stopBtn.disabled = false;
  statusEl.textContent = "Recording in progress...";
  statusEl.classList.add("recording");
}

function pickMimeType() {
  const types = [
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm",
    "video/mp4"
  ];
  return types.find((type) => MediaRecorder.isTypeSupported(type)) || "";
}

function pauseResumeRecording() {
  if (mediaRecorder.state === "recording") {
    mediaRecorder.pause();
    clearInterval(timerInterval);
    pauseBtn.textContent = "Resume";
    statusEl.textContent = "Recording paused";
  } else if (mediaRecorder.state === "paused") {
    mediaRecorder.resume();
    timerInterval = setInterval(() => {
      elapsedSeconds += 1;
      timerEl.textContent = formatTime(elapsedSeconds);
    }, 1000);
    pauseBtn.textContent = "Pause";
    statusEl.textContent = "Recording in progress...";
  }
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
  clearInterval(timerInterval);
  pauseBtn.disabled = true;
  stopBtn.disabled = true;
}

startBtn.addEventListener("click", startRecording);
pauseBtn.addEventListener("click", pauseResumeRecording);
stopBtn.addEventListener("click", stopRecording);