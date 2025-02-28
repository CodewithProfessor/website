const particleCanvas = document.getElementById("particleCanvas");
const particleCtx = particleCanvas.getContext("2d");

// Resize Canvas
function resizeCanvases() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
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

// Particle Class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 4;
        this.weight = Math.random() * 0.5 + 0.3;
        this.directionX = (Math.random() - 0.5) * 1.5;
        this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    }
    update() {
        this.y += this.weight;
        this.x += this.directionX;
        if (this.size > 0.3) this.size -= 0.15;
    }
    draw() {
        particleCtx.beginPath();
        particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        particleCtx.fillStyle = this.color;
        particleCtx.shadowBlur = 10;
        particleCtx.shadowColor = this.color;
        particleCtx.fill();
        particleCtx.shadowBlur = 0; // Reset to avoid affecting other elements
    }
}

const particles = [];
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Handle Cursor/Touch Input
function handleInput(e) {
    const isTouch = e.type.startsWith("touch");
    const x = isTouch ? e.touches[0].clientX : e.clientX;
    const y = isTouch ? e.touches[0].clientY : e.clientY;
    mouseX = x;
    mouseY = y;
    
    // Adjust particle spawn rate based on screen size
    const spawnCount = Math.min(3, Math.floor(window.innerWidth / 200));
    for (let i = 0; i < spawnCount; i++) {
        particles.push(new Particle(mouseX, mouseY));
    }
    if (isTouch) e.preventDefault(); // Prevent scrolling on touch
}

document.addEventListener("mousemove", handleInput);
document.addEventListener("touchmove", handleInput, { passive: false });

// Animation Loop
let lastFrameTime = performance.now();

function animateParticles(timestamp) {
    const deltaTime = (timestamp - lastFrameTime) / 1000;
    lastFrameTime = timestamp;

    // Fade Background
    particleCtx.fillStyle = "rgba(0, 0, 0, 0.05)";
    particleCtx.fillRect(0, 0, particleCanvas.width, particleCanvas.height);

    // Update and Draw Particles
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.size <= 0.3) particles.splice(index, 1);
    });

    requestAnimationFrame(animateParticles);
}

// Start Animation
requestAnimationFrame(animateParticles);

// Sync with global.css Cursor
document.addEventListener("mousemove", (e) => {
    const cursor = document.querySelector("body::after");
    if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursor.style.opacity = "1";
    }
});

document.addEventListener("mouseout", () => {
    const cursor = document.querySelector("body::after");
    if (cursor) cursor.style.opacity = "0";
});
