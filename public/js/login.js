const loginFormHandler = async function (event) {
  event.preventDefault();
console.log("login Test")
  const usernameEl = document.querySelector("#username-input-login");
  const passwordEl = document.querySelector("#password-input-login");
  
  email = usernameEl.value
  password= passwordEl.value
  console.log(email)
//   fetch("/api/user/login", {
//       method: "post",
//       body: JSON.stringify({
//           email: usernameEl.value,
//           password: passwordEl.value
//       }),
//       headers: { "Content-Type": "application/json" }
//   })
//       .then(function () {
//         console.log("dashdickers")
//           document.location.replace("/dashboard");
//           console.log("++++++++++++++++++")
//       })
//       .catch(err => console.log(err));
// };

if (email && password) {
  // Send a POST request to the API endpoint
  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log("RESPONG OK")
    // If successful, redirect the browser to the profile page
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}
};  

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);

