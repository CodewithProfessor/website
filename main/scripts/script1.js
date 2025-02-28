const form = document.querySelector("form");
const fields = {
    name: form.querySelector(".name-field"),
    username: form.querySelector(".username-field"),
    email: form.querySelector(".email-field"),
    password: form.querySelector(".create-password"),
    cPassword: form.querySelector(".confirm-password")
};
const inputs = {
    name: fields.name.querySelector(".name"),
    username: fields.username.querySelector(".username"),
    email: fields.email.querySelector(".email"),
    password: fields.password.querySelector(".password"),
    cPassword: fields.cPassword.querySelector(".cPassword")
};

// Validation Functions
function checkName() {
    const namePattern = /^[a-zA-Z\s]{2,}$/;
    fields.name.classList.toggle("invalid", !namePattern.test(inputs.name.value));
    return !fields.name.classList.contains("invalid");
}

function checkUsername() {
    const usernamePattern = /^[a-zA-Z0-9]{3,16}$/;
    fields.username.classList.toggle("invalid", !usernamePattern.test(inputs.username.value));
    return !fields.username.classList.contains("invalid");
}

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

function confirmPassword() {
    fields.cPassword.classList.toggle("invalid", inputs.password.value !== inputs.cPassword.value || !inputs.cPassword.value);
    return !fields.cPassword.classList.contains("invalid");
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
        checkName(),
        checkUsername(),
        checkEmail(),
        checkPassword(),
        confirmPassword()
    ].every(Boolean);

    if (isValid) {
        const formData = {
            name: inputs.name.value,
            username: inputs.username.value,
            email: inputs.email.value,
            password: inputs.password.value
        };
        console.log("Form data ready for backend:", formData);
        // Uncomment below for backend integration
        /*
        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("Signup successful!");
                form.reset();
            } else {
                alert("Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup error:", error);
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
            case "password": checkPassword(); break;
            case "cPassword": confirmPassword(); break;
        }
    }));
});
