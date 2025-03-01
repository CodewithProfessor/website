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
    const starCount = Math.min(400, Math.floor(window.innerWidth * window.innerHeight / 10000));
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * starCanvas.width,
            y: Math.random() * starCanvas.height,
            z: Math.random() * 0.4 + 0.1,
            radius: Math.random() * 0.8 + 0.2,
            speedX: (Math.random() - 0.5) * 0.08,
            speedY: (Math.random() - 0.5) * 0.08,
            hue: Math.random() * 60 + 60 // Yellowish hues (60-120)
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

    // Fade with yellow tint instead of black
    starCtx.fillStyle = "rgba(255, 255, 0, 0.05)"; // Yellow fade
    starCtx.fillRect(0, 0, starCanvas.width, starCanvas.height);

    // Update and Draw Stars
    stars.forEach(star => {
        star.x = (star.x + star.speedX * deltaTime * 60 + starCanvas.width) % starCanvas.width;
        star.y = (star.y + star.speedY * deltaTime * 60 + starCanvas.height) % starCanvas.height;

        starCtx.beginPath();
        starCtx.fillStyle = `hsla(${star.hue}, 100%, 50%, ${star.z})`; // Bright yellow stars
        starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        starCtx.fill();

        // Subtle glow
        starCtx.shadowBlur = 10;
        starCtx.shadowColor = `hsla(${star.hue}, 100%, 50%, 0.5)`;
        starCtx.fill();
        starCtx.shadowBlur = 0;
    });

    requestAnimationFrame(animateStars);
}

// Start Animation
requestAnimationFrame(animateStars);

// Recreate Stars on Resize
window.addEventListener("resize", () => {
    stars = createStarfield();
});
