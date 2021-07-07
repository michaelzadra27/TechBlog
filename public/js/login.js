const loginFormHandler = async function (event) {
  event.preventDefault();
console.log("login Test")
  const usernameEl = document.querySelector("#username-input-login");
  const passwordEl = document.querySelector("#password-input-login");
  fetch("/api/user/login", {
      method: "post",
      body: JSON.stringify({
          email: usernameEl.value,
          password: passwordEl.value
      }),
      headers: { "Content-Type": "application/json" }
  })
      .then(function () {
        console.log("dashboard")
          document.location.replace("/dashboard");
      })
      .catch(err => console.log(err));
};

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);

