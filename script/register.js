setURL('https://gruppe-318.developerakademie.net/smallest_backend_ever');

async function addUser() {
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let name = document.getElementById('name');
  let phone = document.getElementById('phone');

  users.push({ email: email.value, password: password.value, name: name.value, phone: phone.value });
  await backend.setItem('users', JSON.stringify(users));
  window.location.href = 'login.html?msg=Du hast dich erfolgreich registriert';
}

function openLogin() {
  window.location.href = 'login.html';
}
