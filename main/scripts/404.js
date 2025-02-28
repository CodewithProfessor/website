document.addEventListener("DOMContentLoaded", () => {
    const returnButton = document.querySelector(".error-section .button");

    // Button Animation
    function animateButton() {
        returnButton.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
        returnButton.style.transform = "scale(1.1)";
        returnButton.style.boxShadow = "0 0 25px rgba(255, 0, 255, 0.8)";
        setTimeout(() => {
            returnButton.style.transform = "scale(1)";
            returnButton.style.boxShadow = "0 0 15px rgba(0, 255, 255, 0.5)";
        }, 1500); // Pulse every 1.5s
    }

    // Start Animation Loop
    animateButton();
    setInterval(animateButton, 3000);

    // Mouse/Touch Interaction
    returnButton.addEventListener("mouseenter", () => {
        returnButton.style.transform = "scale(1.15)";
        returnButton.style.boxShadow = "0 0 30px rgba(255, 0, 255, 1)";
    });

    returnButton.addEventListener("mouseleave", () => {
        returnButton.style.transform = "scale(1)";
        returnButton.style.boxShadow = "0 0 15px rgba(0, 255, 255, 0.5)";
    });

    returnButton.addEventListener("touchstart", (e) => {
        e.preventDefault();
        returnButton.style.transform = "scale(1.15)";
        returnButton.style.boxShadow = "0 0 30px rgba(255, 0, 255, 1)";
    }, { passive: false });

    returnButton.addEventListener("touchend", () => {
        returnButton.style.transform = "scale(1)";
        returnButton.style.boxShadow = "0 0 15px rgba(0, 255, 255, 0.5)";
    });

    // Fade-in Animation for Content
    const container = document.querySelector(".error-section .container");
    container.style.opacity = "0";
    container.style.transform = "translateY(20px)";
    setTimeout(() => {
        container.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        container.style.opacity = "1";
        container.style.transform = "translateY(0)";
    }, 200);
});
