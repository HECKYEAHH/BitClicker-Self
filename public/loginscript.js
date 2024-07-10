document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('user-login-form');
    const signupForm = document.getElementById('user-signup-form');

    async function registerUser(username, password) {
        try {
            const response = await fetch('http://menus-symbian.with.playit.plus:2460/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            return data;
        } catch (error) {
            console.error('Error registering user:', error);
            alert(error.message);
            return null;
        }
    }

    async function loginUser(username, password) {
        try {
            const response = await fetch('http://menus-symbian.with.playit.plus:2460/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            return data;
        } catch (error) {
            console.error('Error logging in user:', error);
            alert(error.message);
            return null;
        }
    }

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (!username || !password) {
            alert('Username and password cannot be empty.');
            return;
        }

        const user = await loginUser(username, password);
        if (user) {
            localStorage.setItem('username', username);
            window.location.href = 'idle.html'; // Redirect to the BitClicker game page
        }
    });

    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const username = document.getElementById('signup-username').value.trim();
        const password = document.getElementById('signup-password').value.trim();

        if (!username || !password) {
            alert('Username and password cannot be empty.');
            return;
        }

        const user = await registerUser(username, password);
        if (user) {
            alert('Account created successfully. You can now log in.');
        }
    });
});
