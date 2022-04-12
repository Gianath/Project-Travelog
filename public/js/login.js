const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("Email").value,
    password = document.getElementById("Password").value;

  console.log(email, password);
});
