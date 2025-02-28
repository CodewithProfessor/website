const starCanvas = document.getElementById("starCanvas");
const starCtx = starCanvas.getContext("2d");

// Resize Canvas
function resizeCanvases() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
}
resizeCanvases();

// Debounced Resize Event
function debounce(fn, delay = 100) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}
window.addEventListener("resize", debounce(resizeCanvases));

// Star Creation
function createStarfield() {
    const stars = [];
    const starCount = Math.min(400, Math.floor(window.innerWidth * window.innerHeight / 10000)); // Adaptive star count
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * starCanvas.width,
            y: Math.random() * starCanvas.height,
            z: Math.random() * 0.4 + 0.1,
            radius: Math.random() * 0.8 + 0.2,
            speedX: (Math.random() - 0.5) * 0.08,
            speedY: (Math.random() - 0.5) * 0.08,
            hue: Math.random() * 360
        });
    }
    return stars;
}

let stars = createStarfield();
let lastFrameTime = performance.now();

// Animation Loop
function animateStars(timestamp) {
    const deltaTime = (timestamp - lastFrameTime) / 1000;
    lastFrameTime = timestamp;

    // Fade Background
    starCtx.fillStyle = "rgba(0, 0, 0, 0.08)";
    starCtx.fillRect(0, 0, starCanvas.width, starCanvas.height);

    // Update and Draw Stars
    stars.forEach(star => {
        star.x = (star.x + star.speedX * deltaTime * 60 + starCanvas.width) % starCanvas.width;
        star.y = (star.y + star.speedY * deltaTime * 60 + starCanvas.height) % starCanvas.height;

        starCtx.beginPath();
        starCtx.fillStyle = `hsla(${star.hue}, 70%, 70%, ${star.z})`;
        starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        starCtx.fill();

        // Add subtle glow
        starCtx.shadowBlur = 10;
        starCtx.shadowColor = `hsla(${star.hue}, 70%, 70%, 0.5)`;
        starCtx.fill();
        starCtx.shadowBlur = 0; // Reset to avoid affecting other elements
    });

    requestAnimationFrame(animateStars);
}

// Start Animation
requestAnimationFrame(animateStars);

// Recreate Stars on Resize (Optional Enhancement)
window.addEventListener("resize", () => {
    stars = createStarfield(); // Regenerate stars for new canvas size
});
