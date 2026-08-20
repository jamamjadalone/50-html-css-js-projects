const form = document.getElementById("age-form");
const birthdateInput = document.getElementById("birthdate");
const errorEl = document.getElementById("error");
const resultEl = document.getElementById("result");
const extraEl = document.getElementById("extra");
const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const totalDaysEl = document.getElementById("total-days");
const nextBirthdayEl = document.getElementById("next-birthday");

function setTodayMax() {
  const today = new Date();
  birthdateInput.max = today.toISOString().split("T")[0];
}

function isDateInPast(value) {
  const birth = new Date(value + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return birth < today;
}

function computeAge(birth) {
  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += prevMonthDays;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

function daysBetween(a, b) {
  const ms =
    Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) -
    Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  return Math.round(ms / 86400000);
}

function formatNumber(n) {
  return n.toLocaleString("en-US");
}

function getNextBirthdayInfo(birth) {
  const today = new Date();
  const currentYear = today.getFullYear();
  let next = new Date(currentYear, birth.getMonth(), birth.getDate());

  if (next.getTime() < today.getTime()) {
    next = new Date(currentYear + 1, birth.getMonth(), birth.getDate());
  }

  const diffMs = next.getTime() - today.getTime();
  const total = Math.floor(diffMs / 86400000);
  const weeks = Math.floor(total / 7);
  const daysLeft = total % 7;

  if (total === 0) {
    return "Your birthday is today!";
  }

  const parts = [];
  if (weeks > 0) parts.push(weeks + " week" + (weeks > 1 ? "s" : ""));
  if (daysLeft > 0) parts.push(daysLeft + " day" + (daysLeft > 1 ? "s" : ""));
  return "Next birthday in " + parts.join(" and ") + ".";
}

function animateValue(el, target, suffix) {
  const duration = 600;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = birthdateInput.value;

  errorEl.hidden = true;

  if (!value) {
    showError("Please choose your birth date.");
    return;
  }

  if (!isDateInPast(value)) {
    showError("Please enter a date in the past.");
    return;
  }

  const birth = new Date(value + "T00:00:00");
  const age = computeAge(birth);
  const totalDays = daysBetween(birth, new Date());
  const birthdayInfo = getNextBirthdayInfo(birth);

  animateValue(yearsEl, age.years, "");
  animateValue(monthsEl, age.months, "");
  animateValue(daysEl, age.days, "");

  totalDaysEl.textContent = "You have lived approximately " + formatNumber(totalDays) + " days.";
  nextBirthdayEl.textContent = birthdayInfo;

  resultEl.hidden = false;
  extraEl.hidden = false;
});

function showError(message) {
  errorEl.textContent = message;
  errorEl.hidden = false;
  resultEl.hidden = true;
  extraEl.hidden = true;
}

setTodayMax();
