const form = document.querySelector("form");
const fields = {
    email: form.querySelector(".email-field"),
    password: form.querySelector(".create-password")
};
const inputs = {
    email: fields.email.querySelector(".email"),
    password: fields.password.querySelector(".password")
};

// Validation Functions
function checkEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    fields.email.classList.toggle("invalid", !emailPattern.test(inputs.email.value));
    return !fields.email.classList.contains("invalid");
}

function checkPassword() {
    const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    fields.password.classList.toggle("invalid", !passPattern.test(inputs.password.value));
    return !fields.password.classList.contains("invalid");
}

// Password Toggle
const eyeIcons = document.querySelectorAll(".show-hide");
eyeIcons.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        const pInput = eyeIcon.parentElement.querySelector("input");
        const isPassword = pInput.type === "password";
        pInput.type = isPassword ? "text" : "password";
        eyeIcon.classList.toggle("bx-hide", !isPassword);
        eyeIcon.classList.toggle("bx-show", isPassword);
        eyeIcon.setAttribute("aria-pressed", isPassword);
    });
});

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
        checkEmail(),
        checkPassword()
    ].every(Boolean);

    if (isValid) {
        const formData = {
            email: inputs.email.value,
            password: inputs.password.value
        };
        console.log("Login data ready for backend:", formData);
        // Uncomment below for backend integration
        /*
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("Login successful!");
                form.reset();
                window.location.href = "/profile.html";
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred. Please try again later.");
        }
        */
    }
});

// Real-time Validation
Object.keys(inputs).forEach(key => {
    inputs[key].addEventListener("input", debounce(() => {
        if (key === "email") checkEmail();
        else if (key === "password") checkPassword();
    }));
});
