const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const clearBtn = document.getElementById('clearBtn');
const statusEl = document.getElementById('status');
const micRing = document.getElementById('micRing');
const micCore = document.getElementById('micCore');
const liveTranscript = document.getElementById('liveTranscript');
const resultsList = document.getElementById('resultsList');
const emptyResults = document.getElementById('emptyResults');

let finalTranscript = '';

function setStatus(text, state) {
  statusEl.textContent = text;
  statusEl.className = 'status' + (state ? ' ' + state : '');
}

if (!recognition) {
  startBtn.disabled = true;
  micRing.classList.remove('listening');
  setStatus('Speech recognition is not supported in this browser. Try Chrome or Edge.', 'error');
} else {
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    setStatus('Listening... speak now', 'active');
    micRing.classList.add('listening');
    micCore.classList.add('listening');
    startBtn.disabled = true;
    stopBtn.disabled = false;
  };

  recognition.onresult = (event) => {
    let interim = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      if (result.isFinal) {
        finalTranscript += result[0].transcript + ' ';
        addResult(result[0].transcript);
      } else {
        interim += result[0].transcript;
      }
    }
    liveTranscript.value = (finalTranscript + interim).trim();
  };

  recognition.onerror = (event) => {
    setStatus('Error: ' + event.error, 'error');
    resetButtons();
  };

  recognition.onend = () => {
    setStatus('Stopped', '');
    micRing.classList.remove('listening');
    micCore.classList.remove('listening');
    resetButtons();
  };
}

function resetButtons() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function addResult(text) {
  emptyResults.style.display = 'none';
  const li = document.createElement('li');
  li.textContent = text.trim();
  resultsList.prepend(li);
}

startBtn.addEventListener('click', () => {
  if (!recognition) return;
  finalTranscript = liveTranscript.value;
  recognition.start();
});

stopBtn.addEventListener('click', () => {
  if (recognition) recognition.stop();
});

clearBtn.addEventListener('click', () => {
  finalTranscript = '';
  liveTranscript.value = '';
  resultsList.innerHTML = '';
  emptyResults.style.display = 'block';
});