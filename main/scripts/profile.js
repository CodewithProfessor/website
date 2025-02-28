document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const fields = {
        name: form.querySelector(".name-field"),
        username: form.querySelector(".username-field"),
        email: form.querySelector(".email-field")
    };
    const inputs = {
        name: fields.name.querySelector(".name"),
        username: fields.username.querySelector(".username"),
        email: fields.email.querySelector(".email")
    };

    // Validation Functions (Optional Fields - Only validate if filled)
    function checkName() {
        if (!inputs.name.value) return true; // Allow empty
        const namePattern = /^[a-zA-Z\s]{2,}$/;
        fields.name.classList.toggle("invalid", !namePattern.test(inputs.name.value));
        return !fields.name.classList.contains("invalid");
    }

    function checkUsername() {
        if (!inputs.username.value) return true; // Allow empty
        const usernamePattern = /^[a-zA-Z0-9]{3,16}$/;
        fields.username.classList.toggle("invalid", !usernamePattern.test(inputs.username.value));
        return !fields.username.classList.contains("invalid");
    }

    function checkEmail() {
        if (!inputs.email.value) return true; // Allow empty
        const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        fields.email.classList.toggle("invalid", !emailPattern.test(inputs.email.value));
        return !fields.email.classList.contains("invalid");
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
            checkUsername(),
            checkEmail()
        ].every(Boolean);

        if (isValid) {
            const formData = {
                name: inputs.name.value || undefined,
                username: inputs.username.value || undefined,
                email: inputs.email.value || undefined
            };
            console.log("Profile update data ready for backend:", formData);

            // Mock feedback
            const feedback = document.createElement("p");
            feedback.textContent = "Profile updated successfully!";
            feedback.style.color = "#00ffff";
            feedback.style.textShadow = "0 0 5px rgba(0, 255, 255, 0.5)";
            feedback.style.textAlign = "center";
            form.appendChild(feedback);
            form.reset();

            setTimeout(() => feedback.remove(), 3000);

            // Uncomment below for backend integration
            /*
            try {
                const response = await fetch("/api/profile/update", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    const data = await response.json();
                    alert("Profile updated successfully!");
                    // Optionally update profile-details with new data
                    document.querySelector(".profile-details").innerHTML = `
                        <h2>Welcome, ${data.username || "[Username]"}</h2>
                        <p>Email: ${data.email || "[user@example.com]"}</p>
                        <p>Joined: ${data.joined || "[Date]"}</p>
                    `;
                    form.reset();
                } else {
                    alert("Update failed. Please try again.");
                }
            } catch (error) {
                console.error("Profile update error:", error);
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
                case "username": checkUsername(); break;
                case "email": checkEmail(); break;
            }
        }));
    });
});
