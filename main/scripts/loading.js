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
            return element;
        })
        .catch(error => {
            console.error(`Error loading ${url}:`, error);
            document.getElementById(elementId).innerHTML = `<p>Error loading content. Please refresh.</p>`;
        });
}

function showPage(pageId) {
    const loadingScreen = document.getElementById("loading-screen");
    const content = document.querySelector(".website-content");
    const isLoading = pageId === "loading-screen";

    if (isLoading) {
        loadingScreen.classList.remove("hidden");
        content.classList.add("hidden");
    } else {
        content.classList.remove("hidden");
        setTimeout(() => {
            loadingScreen.classList.add("hidden"); // Delay hiding to match fade
        }, 50); // Sync with content fade-in
    }

    loadingScreen.setAttribute("aria-hidden", !isLoading);
    content.setAttribute("aria-hidden", isLoading);
    document.body.style.overflow = isLoading ? "hidden" : "auto";
}

function initializeLoading() {
    const components = [
        { url: "main/components/loading.html", id: "loading-screen" },
        { url: "main/components/header.html", id: "header" },
        { url: "main/components/hero.html", id: "hero" },
        { url: "main/components/chat.html", id: "chat" },
        { url: "main/components/features.html", id: "features" },
        { url: "main/components/footer.html", id: "footer" }
    ];

    // Pre-set styles to prevent layout shift
    const loadingScreen = document.getElementById("loading-screen");
    const content = document.querySelector(".website-content");
    loadingScreen.style.height = "100vh";
    loadingScreen.style.width = "100%";
    content.style.height = "100vh";
    content.style.width = "100%";
    content.style.transition = "opacity 0.8s ease-in-out";
    content.classList.add("hidden");

    Promise.all(components.map(component => loadComponent(component.url, component.id)))
        .then(() => {
            showPage("loading-screen");
            const delay = window.innerWidth < 600 ? 1500 : 2000; // Optimized delay
            setTimeout(() => {
                showPage("website-content");

                const menuToggle = document.querySelector(".menu-toggle");
                const navUl = document.querySelector("nav ul");
                if (menuToggle && navUl) {
                    menuToggle.addEventListener("click", () => {
                        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
                        menuToggle.setAttribute("aria-expanded", !isExpanded);
                        navUl.classList.toggle("show");
                    });
                    menuToggle.addEventListener("touchstart", (e) => {
                        e.preventDefault();
                        menuToggle.click();
                    }, { passive: false });
                }

                const chatBox = document.getElementById("chat-box");
                const userInput = document.getElementById("user-input");
                const sendBtn = document.getElementById("send-btn");
                if (chatBox && userInput && sendBtn) {
                    const mockResponses = [
                        "Hello! How can I assist you today?",
                        "I’m Galaxy Bot, your AI companion!",
                        "That’s an interesting question! Let me think...",
                        "Try asking me something else!",
                        "I’m here 24/7 to help you out."
                    ];

                    function addMessage(content, isUser = false) {
                        const messageDiv = document.createElement("div");
                        messageDiv.classList.add("message", isUser ? "user-message" : "bot-message");
                        messageDiv.innerHTML = `<p>${content}</p>`;
                        chatBox.appendChild(messageDiv);
                        chatBox.scrollTop = chatBox.scrollHeight;
                    }

                    function getMockResponse() {
                        return mockResponses[Math.floor(Math.random() * mockResponses.length)];
                    }

                    function sendMessage() {
                        const message = userInput.value.trim();
                        if (!message) return;
                        addMessage(message, true);
                        userInput.value = "";
                        setTimeout(() => addMessage(getMockResponse()), 500);
                    }

                    sendBtn.addEventListener("click", sendMessage);
                    userInput.addEventListener("keypress", (e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    });

                    addMessage("Hello! I’m Galaxy Bot. How can I assist you today?");
                }
            }, delay);
        })
        .catch(error => {
            console.error("Error loading components:", error);
            document.getElementById("loading-screen").innerHTML = "<p>Failed to load content. Please refresh.</p>";
        });
}

document.addEventListener("DOMContentLoaded", initializeLoading);
