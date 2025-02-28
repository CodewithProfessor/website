// Load Component Function
function loadComponent(url, elementId) {
    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${url}: ${response.statusText}`);
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(elementId);
            element.innerHTML = data;
            element.setAttribute("aria-busy", "false");
            return element; // Return for potential further processing
        })
        .catch(error => {
            console.error(`Error loading ${url}:`, error);
            document.getElementById(elementId).innerHTML = `<p>Error loading content. Please refresh.</p>`;
        });
}

// Show/Hide Pages
function showPage(pageId) {
    const loadingScreen = document.getElementById("loading-screen");
    const content = document.querySelector(".website-content");
    const isLoading = pageId === "loading-screen";
    
    loadingScreen.style.display = isLoading ? "flex" : "none";
    content.style.display = isLoading ? "none" : "block";
    document.body.style.overflow = isLoading ? "hidden" : "auto";
    
    loadingScreen.setAttribute("aria-hidden", !isLoading);
    content.setAttribute("aria-hidden", isLoading);
}

// Initialize Loading
function initializeLoading() {
    const components = [
        { url: "main/components/loading.html", id: "loading-screen" },
        { url: "main/components/header.html", id: "header" },
        { url: "main/components/hero.html", id: "hero" },
        { url: "main/components/chat.html", id: "chat" },
        { url: "main/components/features.html", id: "features" },
        { url: "main/components/footer.html", id: "footer" }
    ];

    // Set initial loading state
    document.querySelectorAll("#loading-screen, .website-content > div").forEach(el => {
        el.setAttribute("aria-busy", "true");
    });

    // Load all components
    Promise.all(components.map(component => loadComponent(component.url, component.id)))
        .then(() => {
            showPage("loading-screen");

            // Adaptive delay based on screen size
            const delay = window.innerWidth < 600 ? 2000 : 3000;
            setTimeout(() => {
                showPage("website-content");

                // Setup mobile menu toggle after header is loaded
                const menuToggle = document.querySelector(".menu-toggle");
                const navUl = document.querySelector("nav ul");
                if (menuToggle && navUl) {
                    menuToggle.addEventListener("click", () => {
                        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
                        menuToggle.setAttribute("aria-expanded", !isExpanded);
                        navUl.classList.toggle("show");
                    });
                    // Touch support for mobile
                    menuToggle.addEventListener("touchstart", (e) => {
                        e.preventDefault();
                        menuToggle.click();
                    }, { passive: false });
                }
            }, delay);
        })
        .catch(error => {
            console.error("Error loading components:", error);
            document.getElementById("loading-screen").innerHTML = "<p>Failed to load content. Please refresh.</p>";
        });
}

// Start Loading on DOM Ready
document.addEventListener("DOMContentLoaded", initializeLoading);
