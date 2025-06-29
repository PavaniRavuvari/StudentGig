// login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const authMessage = document.getElementById('auth-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginEmail.value;
            const password = loginPassword.value;

            try {
                const userCredential = await auth.signInWithEmailAndPassword(email, password);
                const user = userCredential.user;

                // Get user type from Firestore
                const userDoc = await db.collection('users').doc(user.uid).get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    showMessage('Login successful! Redirecting...', 'success');
                    setTimeout(() => {
                        if (userData.userType === 'student') {
                            window.location.href = 'student-dashboard.html';
                        } else if (userData.userType === 'client') {
                            window.location.href = 'client-dashboard.html';
                        }
                    }, 2000);
                } else {
                    showMessage('User data not found. Please register.', 'error');
                    await auth.signOut(); // Log out if user data is missing
                }

            } catch (error) {
                console.error("Error logging in:", error);
                showMessage(`Login failed: ${error.message}`, 'error');
            }
        });
    }

    function showMessage(message, type) {
        authMessage.textContent = message;
        authMessage.className = `alert alert-${type}`;
        authMessage.style.display = 'block';
        setTimeout(() => {
            authMessage.style.display = 'none';
        }, 5000);
    }
});
