const signupFormHandler = async function (event) {
    console.log("event")
    event.preventDefault();
    console.log("you here")
    const usernameEl = document.querySelector("#username-input-signup");
    const passwordEl = document.querySelector("#password-input-signup");
    fetch("/api/user", {
        method: "post",
        body: JSON.stringify({
            email: usernameEl.value,
            password: passwordEl.value
        }),
        headers: { "Content-Type": "application/json" }
    })
        .then(function () {
            document.location.replace("/dashboard");
        }), console.log("after fetch")
        .catch(err => console.log(err));
};

document
    .querySelector("#signup-btn")
    .addEventListener("click", signupFormHandler);