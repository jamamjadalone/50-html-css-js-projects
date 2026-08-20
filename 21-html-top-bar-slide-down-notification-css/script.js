const topBar = document.getElementById("topBar");
const dismissBtn = document.getElementById("dismissBtn");
const retryBtn = document.getElementById("retryBtn");

function showBar() {
    topBar.classList.add("show");
}

function hideBar() {
    topBar.classList.remove("show");
}

setTimeout(showBar, 800);

dismissBtn.addEventListener("click", hideBar);
retryBtn.addEventListener("click", showBar);
