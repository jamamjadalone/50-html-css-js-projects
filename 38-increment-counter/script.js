const counters = document.querySelectorAll('.stat-value');
const statsSection = document.getElementById('stats');

function animateCounter(el) {
  const target = Number(el.dataset.target);
  const duration = 2000;
  const startTime = performance.now();

  function frame(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString('en-US');
    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      el.textContent = target.toLocaleString('en-US');
    }
  }

  requestAnimationFrame(frame);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => observer.observe(counter));

let manualCount = 0;
const manualEl = document.getElementById('manualCount');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');

function renderManual() {
  manualEl.textContent = manualCount.toLocaleString('en-US');
}

incrementBtn.addEventListener('click', () => {
  manualCount += 1;
  renderManual();
});

decrementBtn.addEventListener('click', () => {
  manualCount -= 1;
  renderManual();
});

resetBtn.addEventListener('click', () => {
  manualCount = 0;
  renderManual();
});

renderManual();