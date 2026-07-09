document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

function setError(inputElement, hasError, customMessage = null) {
    const formGroup = inputElement.closest('.form-group');
    const errorDiv = formGroup.querySelector('.form-error');

    if (hasError) {
        formGroup.classList.add('error');
        if (customMessage) errorDiv.textContent = customMessage;
    } else {
        formGroup.classList.remove('error');
    }
}

function setGlobalError(message) {
    const globalError = document.getElementById('globalError');
    if (message) {
        globalError.textContent = message;
        globalError.style.display = 'block';
    } else {
        globalError.style.display = 'none';
    }
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function handleSignup(e) {
    e.preventDefault();
    setGlobalError(null);

    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    let isValid = true;

    if (nameInput.value.trim().length < 3) {
        setError(nameInput, true);
        isValid = false;
    } else {
        setError(nameInput, false);
    }

    if (!emailRegex.test(emailInput.value.trim())) {
        setError(emailInput, true);
        isValid = false;
    } else {
        setError(emailInput, false);
    }

    if (passwordInput.value.length < 6) {
        setError(passwordInput, true);
        isValid = false;
    } else {
        setError(passwordInput, false);
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        setError(confirmPasswordInput, true);
        isValid = false;
    } else {
        setError(confirmPasswordInput, false);
    }

    if (isValid) {
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some(user => user.email === emailInput.value.trim())) {
            setGlobalError('Email is already registered. Please login.');
            return;
        }

        const newUser = {
            id: Date.now(),
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto login after signup
        localStorage.setItem('loggedInUser', JSON.stringify({ name: newUser.name, email: newUser.email }));

        window.location.href = 'index.html';
    }
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    setGlobalError(null);

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    let isValid = true;

    if (!emailRegex.test(emailInput.value.trim())) {
        setError(emailInput, true);
        isValid = false;
    } else {
        setError(emailInput, false);
    }

    if (passwordInput.value.length === 0) {
        setError(passwordInput, true);
        isValid = false;
    } else {
        setError(passwordInput, false);
    }

    if (isValid) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify({ name: user.name, email: user.email }));
            window.location.href = 'index.html';
        } else {
            setGlobalError('Invalid email or password.');
        }
    }
}
