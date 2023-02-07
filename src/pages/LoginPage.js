import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
const loginEmailInput = document.querySelector("#login-input-email");
const loginPasswordInput = document.querySelector("#login-input-password");
const loginBtn = document.querySelector("#login-btn");
loginEmailInput.addEventListener("input", () => {
    let errorArr = validateEmail(loginEmailInput.value);
    if (errorArr.length === 0) {
        loginEmailInput.classList.remove("is-invalid");
        document.getElementById("login-alert-email").classList.add("d-none");
    }
    else {
        loginEmailInput.classList.add("is-invalid");
        document.getElementById("login-alert-email").classList.remove("d-none");
        document.getElementById("login-alert-email").innerHTML =
            errorArr.join("<br>");
    }
});
loginPasswordInput.addEventListener("input", () => {
    let errorArr = validatePassword(loginPasswordInput.value);
    if (errorArr.length === 0) {
        loginPasswordInput.classList.remove("is-invalid");
        document.getElementById("login-alert-password").classList.add("d-none");
    }
    else {
        loginPasswordInput.classList.add("is-invalid");
        document.getElementById("login-alert-password").classList.remove("d-none");
        document.getElementById("login-alert-password").innerHTML =
            errorArr.join("<br>");
    }
});
loginBtn.addEventListener("click", () => {
    if (validateEmail(loginEmailInput.value).length) {
        return;
    }
    if (validatePassword(loginPasswordInput.value).length) {
        return;
    }
    let usersStr = localStorage.getItem("users");
    if (!usersStr) {
        return;
    }
    let users = JSON.parse(usersStr);
    let user = users.find((item) => item.email === loginEmailInput.value &&
        item.password === loginPasswordInput.value);
    if (!user) {
        console.log("invalid email and/or password");
        return;
    }
    localStorage.setItem("token", JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }));
    location.reload();
});
