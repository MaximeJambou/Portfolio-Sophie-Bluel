const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(loginForm);

  const email = formData.get('email');
  const password = formData.get('password');

  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
        'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.userId && data.token) {
        const { userId, token } = data;

        // Stockage dans le local storage
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);

        window.location.href = '../index.html';
      } else {
        errorMessage.textContent = "Erreur dans l'identifiant ou le mot de passe";
      }
    })
    .catch(error => {
      console.log('Erreur de connexion', error);
    });
});
