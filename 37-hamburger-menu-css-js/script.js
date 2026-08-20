const hamburger = document.getElementById("hamburger");
const overlay = document.getElementById("overlay");
const menuLinks = document.querySelectorAll(".menu-link");

function setMenu(open) {
    hamburger.classList.toggle("open", open);
    overlay.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    hamburger.setAttribute("aria-expanded", String(open));
    hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    overlay.setAttribute("aria-hidden", String(!open));
}

hamburger.addEventListener("click", () => {
    setMenu(!overlay.classList.contains("open"));
});

menuLinks.forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        setMenu(false);
    }
});