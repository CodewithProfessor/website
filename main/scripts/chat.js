// Chat Functionality
document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    // Mock Responses for Frontend-Only
    const mockResponses = [
        "Hello! How can I assist you today?",
        "I’m Galaxy Bot, your AI companion!",
        "That’s an interesting question! Let me think...",
        "Try asking me something else!",
        "I’m here 24/7 to help you out."
    ];

    // Add Message to Chat Box
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", isUser ? "user-message" : "bot-message");
        messageDiv.innerHTML = `<p>${content}</p>`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to bottom
    }

    // Simulate Bot Response
    function getMockResponse() {
        const randomIndex = Math.floor(Math.random() * mockResponses.length);
        return mockResponses[randomIndex];
    }

    // Handle Sending Message
    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        addMessage(message, true);
        userInput.value = "";

        // Mock bot response with delay
        setTimeout(() => {
            const botResponse = getMockResponse();
            addMessage(botResponse);
        }, 500);
    }

    // Event Listeners
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Initial Bot Message
    addMessage("Hello! I’m Galaxy Bot. How can I assist you today?");
});

// Backend Integration Placeholder (Uncomment when ready)
/*
async function sendMessageToBackend(message) {
    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });
        if (!response.ok) throw new Error("Chat request failed");
        const data = await response.json();
        return data.response || "Sorry, no response.";
    } catch (error) {
        console.error("Chat error:", error);
        return "Oops! Something went wrong.";
    }
}
*/
