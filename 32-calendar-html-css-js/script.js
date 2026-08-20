const monthLabel = document.getElementById("month-label");
const daysGrid = document.getElementById("days-grid");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const selectedDateEl = document.getElementById("selected-date");
const todayLabel = document.getElementById("today-label");

const today = new Date();
const todayKey = dateKey(today);
todayLabel.textContent = `Today: ${formatShort(today)}`;

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selected = null;

function dateKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function formatShort(date) {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function renderCalendar() {
  monthLabel.textContent = new Date(currentYear, currentMonth, 1).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric"
  });

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  daysGrid.innerHTML = "";

  for (let i = firstDay - 1; i >= 0; i--) {
    const dayNum = prevMonthDays - i;
    daysGrid.appendChild(createDay(
      new Date(currentYear, currentMonth - 1, dayNum),
      true
    ));
  }

  for (let d = 1; d <= daysInMonth; d++) {
    daysGrid.appendChild(createDay(new Date(currentYear, currentMonth, d), false));
  }

  const remaining = 7 - (daysGrid.children.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      daysGrid.appendChild(createDay(
        new Date(currentYear, currentMonth + 1, d),
        true
      ));
    }
  }
}

function createDay(date, isOther) {
  const el = document.createElement("div");
  el.className = "day";
  el.textContent = date.getDate();

  if (isOther) el.classList.add("other-month");

  const dow = date.getDay();
  if (dow === 0 || dow === 6) el.classList.add("weekend");

  if (!isOther && dateKey(date) === todayKey) el.classList.add("today");

  if (selected && dateKey(date) === dateKey(selected)) el.classList.add("selected");

  el.addEventListener("click", () => {
    if (isOther) return;
    selectDate(date);
  });

  return el;
}

function selectDate(date) {
  selected = date;
  selectedDateEl.textContent = formatShort(date);
  renderCalendar();
}

function changeMonth(delta) {
  currentMonth += delta;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear -= 1;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear += 1;
  }
  renderCalendar();
}

prevBtn.addEventListener("click", () => changeMonth(-1));
nextBtn.addEventListener("click", () => changeMonth(1));

renderCalendar();