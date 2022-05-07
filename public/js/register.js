const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("Username").value,
    email = document.getElementById("Email").value,
    password = document.getElementById("Password").value;

  const res = await fetch("/user/api/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "success") {
        console.log("redirect");
        window.location.href = "/login";
      }
    });
});
