const micBtn = document.getElementById("mic-btn");
const statusEl = document.getElementById("status");
const interimEl = document.getElementById("interim");
const transcriptEl = document.getElementById("transcript");
const placeholderEl = document.getElementById("placeholder");
const clearBtn = document.getElementById("clear-btn");
const warningEl = document.getElementById("warning");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;
let isListening = false;
let finalTranscript = "";

function updateUI() {
  if (finalTranscript.trim() === "" && interimEl.textContent.trim() === "") {
    placeholderEl.hidden = false;
  } else {
    placeholderEl.hidden = true;
  }
  transcriptEl.textContent = finalTranscript + interimEl.textContent;
}

if (!SpeechRecognition) {
  micBtn.disabled = true;
  micBtn.style.opacity = "0.4";
  micBtn.style.cursor = "not-allowed";
  statusEl.textContent = "Speech recognition unavailable";
  warningEl.hidden = false;
} else {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onstart = () => {
    isListening = true;
    micBtn.classList.add("listening");
    statusEl.textContent = "Listening... speak now";
    statusEl.classList.add("listening");
  };

  recognition.onresult = (event) => {
    let interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      if (result.isFinal) {
        finalTranscript += result[0].transcript + " ";
      } else {
        interimTranscript += result[0].transcript;
      }
    }
    interimEl.textContent = interimTranscript;
    updateUI();
  };

  recognition.onerror = (event) => {
    if (event.error === "not-allowed" || event.error === "service-not-allowed") {
      statusEl.textContent = "Microphone access was denied. Allow access and try again.";
    } else if (event.error === "no-speech") {
      statusEl.textContent = "No speech detected. Press the mic and try again.";
    } else if (event.error === "network") {
      statusEl.textContent = "Network error. Speech recognition needs a connection.";
    } else {
      statusEl.textContent = "Something went wrong. Please try again.";
    }
    statusEl.classList.remove("listening");
    isListening = false;
    micBtn.classList.remove("listening");
  };

  recognition.onend = () => {
    isListening = false;
    micBtn.classList.remove("listening");
    statusEl.classList.remove("listening");
    if (finalTranscript.trim() === "" && interimEl.textContent.trim() === "") {
      statusEl.textContent = "Press the mic and start talking";
    } else {
      statusEl.textContent = "Stopped. Press the mic to keep talking.";
    }
    interimEl.textContent = "";
    updateUI();
  };

  micBtn.addEventListener("click", () => {
    if (isListening) {
      recognition.stop();
    } else {
      interimEl.textContent = "";
      try {
        recognition.start();
      } catch (error) {
        recognition.stop();
      }
    }
  });
}

clearBtn.addEventListener("click", () => {
  finalTranscript = "";
  interimEl.textContent = "";
  updateUI();
  if (!isListening) {
    statusEl.textContent = "Press the mic and start talking";
  }
});