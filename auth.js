// auth.js
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const authMessage = document.getElementById('auth-message');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = registerEmail.value;
            const password = registerPassword.value;
            const userType = userType.value;

            try {
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;

                // Store user type in Firestore
                await db.collection('users').doc(user.uid).set({
                    email: user.email,
                    userType: userType,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });

                showMessage('Registration successful! Redirecting...', 'success');
                // Redirect to profile setup or dashboard based on user type
                setTimeout(() => {
                    if (userType === 'student') {
                        window.location.href = 'profile-setup.html?type=student';
                    } else if (userType === 'client') {
                        window.location.href = 'profile-setup.html?type=client'; // Or directly to client dashboard
                    }
                }, 2000);

            } catch (error) {
                console.error("Error registering:", error);
                showMessage(`Registration failed: ${error.message}`, 'error');
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
