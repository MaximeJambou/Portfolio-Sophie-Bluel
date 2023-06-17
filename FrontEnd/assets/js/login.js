const loginForm = document.getElementById('loginForm');

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
      const { userId, token } = data;

      //Stockage dans le local storage
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);

      console.log('Connexion arabe réussie, rive sud !')
    })
    .catch(error => {
        console.log('Erreur de connexion hydroponique', error);
    });
});
