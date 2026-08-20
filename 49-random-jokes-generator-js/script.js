const jokeEl = document.getElementById("joke");
const sourceEl = document.getElementById("source");
const btn = document.getElementById("get-joke-btn");
const jokeBox = document.querySelector(".joke-box");

const LOCAL_JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "There are only 10 kinds of people in this world: those who understand binary and those who don't.",
  "A SQL query walks into a bar, goes up to two tables and asks: 'Can I JOIN you?'",
  "Why do Java developers wear glasses? Because they can't C#.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "I would tell you a UDP joke, but you might not get it.",
  "Debugging: being the detective in a crime movie where you are also the murderer.",
  "Why did the developer go broke? Because he used up all his cache.",
  "Programming is 10% science, 20% ingenuity, and 70% getting the original 10% to work.",
  "There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.",
  "Why was the JavaScript developer sad? Because he didn't Node how to Express himself.",
  "A programmer puts two glasses on his bedside table: one full and one empty. The full one is for the night.",
  "Artificial intelligence is no match for natural stupidity.",
  "I'm not a great programmer; I'm just a good programmer with great habits.",
  "The best thing about a boolean is even if you are wrong, you are only off by a bit.",
  "Why do programmers hate nature? It has too many bugs.",
  "To understand recursion, you must first understand recursion.",
  "99 bugs in the code, take one down, patch it around, 127 bugs in the code.",
  "Software: flexible, except when it comes to updating.",
  "My code doesn't work. I have no idea why. My code works. I have no idea why.",
];

function pickLocalJoke() {
  return LOCAL_JOKES[Math.floor(Math.random() * LOCAL_JOKES.length)];
}

function randomLocalIndex() {
  return Math.floor(Math.random() * LOCAL_JOKES.length);
}

async function fetchJoke() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Programming?type=single", {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error("Request failed");

    const data = await response.json();
    if (data.error || !data.joke) throw new Error("No joke returned");

    return { joke: data.joke, source: "JokeAPI" };
  } finally {
    clearTimeout(timeout);
  }
}

function setLoading(loading) {
  jokeBox.classList.toggle("loading", loading);
  btn.disabled = loading;
  btn.textContent = loading ? "Loading..." : "Get Joke";
}

async function getJoke() {
  setLoading(true);

  try {
    const result = await fetchJoke();
    jokeEl.textContent = result.joke;
    sourceEl.textContent = "via " + result.source;
  } catch (error) {
    const localIndex = randomLocalIndex();
    jokeEl.textContent = LOCAL_JOKES[localIndex];
    sourceEl.textContent = "Offline library";
  } finally {
    setLoading(false);
  }
}

btn.addEventListener("click", getJoke);

getJoke();