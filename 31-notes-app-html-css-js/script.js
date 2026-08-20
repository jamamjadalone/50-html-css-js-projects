const STORAGE_KEY = "notes-app-notes";

const form = document.getElementById("note-form");
const idInput = document.getElementById("note-id");
const titleInput = document.getElementById("note-title");
const bodyInput = document.getElementById("note-body");
const colorInput = document.getElementById("note-color");
const saveBtn = document.getElementById("save-btn");
const cancelBtn = document.getElementById("cancel-btn");
const searchInput = document.getElementById("search");
const grid = document.getElementById("notes-grid");
const emptyState = document.getElementById("empty-state");

let notes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function filterNotes() {
  const query = searchInput.value.trim().toLowerCase();
  return notes.filter(
    (n) =>
      n.title.toLowerCase().includes(query) ||
      n.body.toLowerCase().includes(query)
  );
}

function renderNotes() {
  const list = filterNotes();
  grid.innerHTML = "";

  if (list.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  list.forEach((note) => {
    const card = document.createElement("article");
    card.className = "note";
    card.style.setProperty("--note-color", note.color);

    const title = document.createElement("h3");
    title.textContent = note.title;

    const body = document.createElement("p");
    body.textContent = note.body;

    const meta = document.createElement("div");
    meta.className = "meta";

    const date = document.createElement("span");
    date.textContent = new Date(note.updated).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    const controls = document.createElement("div");
    controls.className = "controls";

    const editBtn = document.createElement("button");
    editBtn.className = "icon-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => startEdit(note.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "icon-btn delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    controls.appendChild(editBtn);
    controls.appendChild(deleteBtn);
    meta.appendChild(date);
    meta.appendChild(controls);

    card.appendChild(title);
    card.appendChild(body);
    card.appendChild(meta);
    grid.appendChild(card);
  });
}

function resetForm() {
  form.reset();
  idInput.value = "";
  saveBtn.textContent = "Add Note";
  cancelBtn.classList.add("hidden");
  document.getElementById("note-title").focus();
}

function startEdit(id) {
  const note = notes.find((n) => n.id === id);
  if (!note) return;

  idInput.value = note.id;
  titleInput.value = note.title;
  bodyInput.value = note.body;
  colorInput.value = note.color;
  saveBtn.textContent = "Update Note";
  cancelBtn.classList.remove("hidden");
  titleInput.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteNote(id) {
  notes = notes.filter((n) => n.id !== id);
  saveToStorage();
  if (idInput.value === id) resetForm();
  renderNotes();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();
  if (!title || !body) return;

  const editingId = idInput.value;

  if (editingId) {
    const note = notes.find((n) => n.id === editingId);
    if (note) {
      note.title = title;
      note.body = body;
      note.color = colorInput.value;
      note.updated = Date.now();
    }
  } else {
    notes.unshift({
      id: Date.now().toString(),
      title,
      body,
      color: colorInput.value,
      updated: Date.now()
    });
  }

  saveToStorage();
  resetForm();
  renderNotes();
});

cancelBtn.addEventListener("click", resetForm);

searchInput.addEventListener("input", renderNotes);

renderNotes();