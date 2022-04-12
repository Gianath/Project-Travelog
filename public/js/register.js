const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("Username").value,
    email = document.getElementById("Email").value;
  const res = await fetch("/register/api", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
    }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
});
