const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const indicator = document.getElementById("indicator");

function moveIndicator(tab) {
  const index = Array.from(tabs).indexOf(tab);
  indicator.classList.remove(
    "left-0",
    "left-1",
    "left-2",
    "left-3",
    "left-4"
  );
  indicator.classList.add(`left-${index}`);
}

function activateTab(tab) {
  const target = tab.dataset.tab;

  tabs.forEach((t) => t.classList.toggle("active", t === tab));
  panels.forEach((p) => p.classList.toggle("active", p.dataset.panel === target));

  moveIndicator(tab);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab));
});

moveIndicator(document.querySelector(".tab.active"));