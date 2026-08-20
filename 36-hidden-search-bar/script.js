const searchBar = document.getElementById("searchBar");
const toggleBtn = document.getElementById("toggleBtn");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const hint = document.getElementById("hint");

function openSearch() {
    searchBar.classList.add("open");
    hint.textContent = "Type and press Enter to search.";
    setTimeout(() => searchInput.focus(), 200);
}

function closeSearch() {
    searchBar.classList.remove("open");
    searchInput.value = "";
    hint.textContent = "Click the icon to open the search.";
}

toggleBtn.addEventListener("click", () => {
    if (searchBar.classList.contains("open")) {
        closeSearch();
    } else {
        openSearch();
    }
});

searchInput.addEventListener("blur", () => {
    if (!searchInput.value) {
        closeSearch();
    }
});

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        hint.textContent = 'Searching for "' + query + '"...';
    }
    searchInput.blur();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeSearch();
    }
});