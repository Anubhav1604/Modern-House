document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => (u.username === usernameInput || u.email === usernameInput) && u.password === passwordInput);

    const messageElem = document.getElementById('loginMessage');

    if (user) {
        messageElem.style.color = 'green';
        messageElem.textContent = 'Login successful! Redirecting...';
        // Redirect to homepage or dashboard after login
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        messageElem.style.color = 'red';
        messageElem.textContent = 'Invalid username/email or password.';
    }
});
