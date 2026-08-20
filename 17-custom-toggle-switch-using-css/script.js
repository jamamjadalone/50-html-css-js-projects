const rows = document.querySelectorAll(".switch-row");

rows.forEach((row) => {
    const input = row.querySelector(".switch input");
    const state = row.querySelector(".state-text");

    const update = () => {
        const on = input.checked;
        state.textContent = on ? "On" : "Off";
        state.classList.toggle("on", on);
        state.classList.toggle("off", !on);
    };

    update();
    input.addEventListener("change", update);
});