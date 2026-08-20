const people = [
  { name: "Ava Thompson", role: "Frontend Developer", dept: "Engineering" },
  { name: "Noah Patel", role: "Backend Developer", dept: "Engineering" },
  { name: "Mia Rodriguez", role: "UI Designer", dept: "Design" },
  { name: "Liam Chen", role: "Product Designer", dept: "Design" },
  { name: "Sophia Nguyen", role: "Marketing Lead", dept: "Marketing" },
  { name: "Ethan Kim", role: "Growth Marketer", dept: "Marketing" },
  { name: "Isabella Rossi", role: "Data Scientist", dept: "Engineering" },
  { name: "Lucas Garcia", role: "DevOps Engineer", dept: "Engineering" },
  { name: "Amelia Brown", role: "Content Writer", dept: "Marketing" },
  { name: "Oliver Davis", role: "Project Manager", dept: "Management" },
  { name: "Harper Wilson", role: "QA Engineer", dept: "Engineering" },
  { name: "Elijah Moore", role: "UX Researcher", dept: "Design" },
  { name: "Grace Taylor", role: "Sales Manager", dept: "Management" },
  { name: "James Anderson", role: "Security Analyst", dept: "Engineering" },
  { name: "Zoe Martin", role: "HR Specialist", dept: "Management" }
];

const departments = ["All", ...new Set(people.map((p) => p.dept))];

const searchInput = document.getElementById("search");
const filtersEl = document.getElementById("filters");
const cardsEl = document.getElementById("cards");
const noResults = document.getElementById("no-results");

let activeDept = "All";

function buildFilters() {
  departments.forEach((dept) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (dept === activeDept ? " active" : "");
    btn.textContent = dept;
    btn.addEventListener("click", () => {
      activeDept = dept;
      filtersEl.querySelectorAll(".filter-btn").forEach((b) =>
        b.classList.toggle("active", b.textContent === dept)
      );
      renderCards();
    });
    filtersEl.appendChild(btn);
  });
}

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("");
}

const avatarColors = ["#e34b8c", "#5b8cff", "#2fd4a8", "#ffc65c", "#a06bff", "#ff7a5b"];

function colorFor(name) {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) % 997;
  return avatarColors[hash % avatarColors.length];
}

function renderCards() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = people.filter((p) => {
    const matchesDept = activeDept === "All" || p.dept === activeDept;
    const matchesQuery =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.role.toLowerCase().includes(query) ||
      p.dept.toLowerCase().includes(query);
    return matchesDept && matchesQuery;
  });

  cardsEl.innerHTML = "";

  if (filtered.length === 0) {
    noResults.classList.remove("hidden");
    return;
  }
  noResults.classList.add("hidden");

  filtered.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = initials(p.name);
    avatar.style.background = colorFor(p.name);

    const info = document.createElement("div");
    info.className = "card-info";

    const name = document.createElement("h3");
    name.textContent = p.name;

    const role = document.createElement("p");
    role.className = "role";
    role.textContent = p.role;

    const dept = document.createElement("span");
    dept.className = "dept";
    dept.textContent = p.dept;

    info.appendChild(name);
    info.appendChild(role);
    info.appendChild(dept);

    card.appendChild(avatar);
    card.appendChild(info);
    cardsEl.appendChild(card);
  });
}

searchInput.addEventListener("input", renderCards);

buildFilters();
renderCards();