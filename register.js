document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const messageElem = document.getElementById('registrationMessage');

    if (password !== confirmPassword) {
        messageElem.style.color = 'red';
        messageElem.textContent = 'Passwords do not match.';
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if username or email already exists
    const userExists = users.some(user => user.username === username || user.email === email);

    if (userExists) {
        messageElem.style.color = 'red';
        messageElem.textContent = 'Username or email already exists.';
        return;
    }

    // Save new user
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    messageElem.style.color = 'green';
    messageElem.textContent = 'Registration successful! Redirecting to login...';

    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
});
