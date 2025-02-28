document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const fields = {
        name: form.querySelector(".name-field"),
        email: form.querySelector(".email-field"),
        message: form.querySelector(".message-field")
    };
    const inputs = {
        name: fields.name.querySelector(".name"),
        email: fields.email.querySelector(".email"),
        message: fields.message.querySelector(".message")
    };

    // Validation Functions
    function checkName() {
        const namePattern = /^[a-zA-Z\s]{2,}$/;
        fields.name.classList.toggle("invalid", !namePattern.test(inputs.name.value));
        return !fields.name.classList.contains("invalid");
    }

    function checkEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        fields.email.classList.toggle("invalid", !emailPattern.test(inputs.email.value));
        return !fields.email.classList.contains("invalid");
    }

    function checkMessage() {
        fields.message.classList.toggle("invalid", inputs.message.value.trim().length < 10);
        return !fields.message.classList.contains("invalid");
    }

    // Debounce Function
    function debounce(fn, delay = 300) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn(...args), delay);
        };
    }

    // Form Submission
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const isValid = [
            checkName(),
            checkEmail(),
            checkMessage()
        ].every(Boolean);

        if (isValid) {
            const formData = {
                name: inputs.name.value,
                email: inputs.email.value,
                message: inputs.message.value
            };
            console.log("Contact form data ready for backend:", formData);

            // Mock feedback
            const feedback = document.createElement("p");
            feedback.textContent = "Message sent successfully! We’ll get back to you soon.";
            feedback.style.color = "#00ffff";
            feedback.style.textShadow = "0 0 5px rgba(0, 255, 255, 0.5)";
            form.appendChild(feedback);
            form.reset();

            setTimeout(() => feedback.remove(), 3000);

            // Uncomment below for backend integration
            /*
            try {
                const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    form.innerHTML = "<p>Message sent successfully! We’ll get back to you soon.</p>";
                } else {
                    alert("Failed to send message. Please try again.");
                }
            } catch (error) {
                console.error("Contact error:", error);
                alert("An error occurred. Please try again later.");
            }
            */
        }
    });

    // Real-time Validation
    Object.keys(inputs).forEach(key => {
        inputs[key].addEventListener("input", debounce(() => {
            switch (key) {
                case "name": checkName(); break;
                case "email": checkEmail(); break;
                case "message": checkMessage(); break;
            }
        }));
    });
});
