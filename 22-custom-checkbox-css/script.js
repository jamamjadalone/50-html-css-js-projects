const checkboxes = document.querySelectorAll('input[name="extras"]');
const result = document.getElementById("result");

function updateResult() {
    const selected = [...checkboxes]
        .filter((box) => box.checked)
        .map((box) => box.value.replace(/\b\w/g, (c) => c.toUpperCase()));

    result.textContent = selected.length
        ? "Selected: " + selected.join(", ")
        : "No extras selected";
}

checkboxes.forEach((box) => box.addEventListener("change", updateResult));