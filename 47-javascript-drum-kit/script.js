const pads = document.querySelectorAll(".pad");
const padMap = new Map();
let audioCtx = null;
let noiseBuffer = null;

pads.forEach((pad) => {
  padMap.set(pad.dataset.key, pad);
});

function getContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function getNoiseBuffer(ctx) {
  if (!noiseBuffer) {
    noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return noiseBuffer;
}

function playTone(ctx, type, freqStart, freqEnd, duration, peak) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const now = ctx.currentTime;

  osc.type = type;
  osc.frequency.setValueAtTime(Math.max(freqStart, 1), now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 1), now + duration);

  gain.gain.setValueAtTime(peak, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.05);
}

function playNoise(ctx, filterType, freq, q, duration, peak) {
  const src = ctx.createBufferSource();
  src.buffer = getNoiseBuffer(ctx);

  const filter = ctx.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.value = freq;
  filter.Q.value = q;

  const gain = ctx.createGain();
  const now = ctx.currentTime;

  gain.gain.setValueAtTime(peak, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  src.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  src.start(now);
  src.stop(now + duration + 0.05);
}

const drumPlayers = {
  kick(ctx) {
    playTone(ctx, "sine", 150, 45, 0.35, 1);
    playNoise(ctx, "lowpass", 900, 1, 0.06, 0.25);
  },
  snare(ctx) {
    playTone(ctx, "triangle", 210, 160, 0.1, 0.35);
    playNoise(ctx, "bandpass", 1800, 1, 0.2, 0.8);
  },
  hihat(ctx) {
    playNoise(ctx, "highpass", 7000, 1, 0.08, 0.5);
  },
  "open-hat"(ctx) {
    playNoise(ctx, "highpass", 6000, 1, 0.4, 0.4);
  },
  crash(ctx) {
    playNoise(ctx, "highpass", 4200, 0.6, 0.9, 0.5);
  },
  ride(ctx) {
    playNoise(ctx, "highpass", 5200, 1, 0.6, 0.35);
  },
  clap(ctx) {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => playNoise(ctx, "bandpass", 1600, 1, 0.12, 0.6), i * 70);
    }
  },
  "tom-low"(ctx) {
    playTone(ctx, "sine", 140, 70, 0.3, 0.9);
  },
  "tom-high"(ctx) {
    playTone(ctx, "sine", 220, 115, 0.3, 0.9);
  },
};

function playSound(key) {
  const pad = padMap.get(key);
  const sound = pad ? pad.dataset.sound : null;
  if (!sound) return;

  const ctx = getContext();
  const player = drumPlayers[sound];
  if (!player) return;

  player(ctx);
  triggerAnimation(pad);
}

function triggerAnimation(pad) {
  pad.classList.add("playing");
  setTimeout(() => {
    pad.classList.remove("playing");
  }, 120);
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (padMap.has(key)) {
    event.preventDefault();
    playSound(key);
  }
});

pads.forEach((pad) => {
  pad.addEventListener("click", () => playSound(pad.dataset.key));
  pad.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      playSound(pad.dataset.key);
    }
  });
});