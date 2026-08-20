const track = document.getElementById("track");
const dotsEl = document.getElementById("dots");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const slider = document.getElementById("slider");

const slides = [
  { id: 1015, caption: "River through the valley" },
  { id: 1016, caption: "Canyon walls" },
  { id: 1018, caption: "Mountain lake" },
  { id: 1020, caption: "Bear on the rocks" },
  { id: 1035, caption: "Foggy ridge" },
];

const IMG_WIDTH = 800;
const IMG_HEIGHT = 500;

let currentIndex = 0;
let autoplayTimer = null;
const AUTOPLAY_MS = 3500;

function buildSlides() {
  slides.forEach((slideData, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";

    const img = document.createElement("img");
    img.src = "https://picsum.photos/id/" + slideData.id + "/" + IMG_WIDTH + "/" + IMG_HEIGHT;
    img.alt = slideData.caption;
    img.loading = index === 0 ? "eager" : "lazy";

    const caption = document.createElement("div");
    caption.className = "caption";
    caption.textContent = slideData.caption;

    slide.appendChild(img);
    slide.appendChild(caption);
    track.appendChild(slide);
  });
}

function buildDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.setAttribute("aria-label", "Go to slide " + (index + 1));
    dot.addEventListener("click", () => {
      goTo(index);
      restartAutoplay();
    });
    dotsEl.appendChild(dot);
  });
}

function goTo(index) {
  const total = slides.length;
  currentIndex = (index + total) % total;
  track.style.transform = "translateX(-" + currentIndex * 100 + "%)";
  updateDots();
}

function next() {
  goTo(currentIndex + 1);
}

function prev() {
  goTo(currentIndex - 1);
}

function updateDots() {
  const dots = dotsEl.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function startAutoplay() {
  stopAutoplay();
  autoplayTimer = setInterval(next, AUTOPLAY_MS);
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
}

function restartAutoplay() {
  startAutoplay();
}

prevBtn.addEventListener("click", () => {
  prev();
  restartAutoplay();
});

nextBtn.addEventListener("click", () => {
  next();
  restartAutoplay();
});

slider.addEventListener("mouseenter", stopAutoplay);
slider.addEventListener("mouseleave", startAutoplay);

buildSlides();
buildDots();
goTo(0);
startAutoplay();