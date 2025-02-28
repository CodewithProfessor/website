document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector(".about-section");
    const listItems = aboutSection.querySelectorAll("li");

    // Hover/Touch Animation for List Items
    listItems.forEach(item => {
        // Mouse Events
        item.addEventListener("mouseenter", () => {
            item.style.transition = "transform 0.3s ease, color 0.3s ease";
            item.style.transform = "translateX(10px)";
            item.style.color = "#ff00ff";
        });

        item.addEventListener("mouseleave", () => {
            item.style.transform = "translateX(0)";
            item.style.color = "#ffffff";
        });

        // Touch Events for Mobile
        item.addEventListener("touchstart", (e) => {
            e.preventDefault();
            item.style.transition = "transform 0.3s ease, color 0.3s ease";
            item.style.transform = "translateX(10px)";
            item.style.color = "#ff00ff";
        }, { passive: false });

        item.addEventListener("touchend", () => {
            item.style.transform = "translateX(0)";
            item.style.color = "#ffffff";
        });
    });

    // Fade-in Animation for Sections
    const sections = aboutSection.querySelectorAll("h2, p, ul");
    sections.forEach((section, index) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        setTimeout(() => {
            section.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }, index * 200); // Staggered fade-in
    });
});
