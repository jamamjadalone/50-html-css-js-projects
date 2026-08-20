const cards = document.querySelectorAll(".tilt-card");

cards.forEach((card) => {
    const glare = card.querySelector(".glare");

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 12;
        const rotateX = -((y - centerY) / centerY) * 12;

        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

        if (glare) {
            glare.style.setProperty("--gx", `${(x / rect.width) * 100}%`);
            glare.style.setProperty("--gy", `${(y / rect.height) * 100}%`);
        }
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
});