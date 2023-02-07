import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import validateName from "../validation/validateName.js";
import showToast from "../services/Toast.js";
const inputName = document.getElementById("profile-input-name");
const inputEmail = document.getElementById("profile-input-email");
const inputPassword = document.getElementById("profile-input-password");
const btnProfile = document.querySelector("#profile-btn");
let nameOk = false;
let emailOk = false;
let passwordOk = false;
window.addEventListener("load", () => {
    let usersStr = localStorage.getItem("users");
    let tokenStr = localStorage.getItem("token");
    let users;
    let token;
    if (usersStr && tokenStr) {
        users = JSON.parse(usersStr);
        token = JSON.parse(tokenStr);
        let user = users.find((item) => item.id === token.id);
        if (user) {
            inputName.value = user.name;
            inputEmail.value = user.email;
            inputPassword.value = user.password;
        }
    }
    if (inputName.value !== "") {
        checkNameInput();
    }
    if (inputEmail.value !== "") {
        checkEmailInput();
    }
    if (inputPassword.value !== "") {
        checkPasswordInput();
    }
});
inputName.addEventListener("input", () => {
    checkNameInput();
});
inputEmail.addEventListener("input", () => {
    checkEmailInput();
});
inputPassword.addEventListener("input", () => {
    checkPasswordInput();
});
const checkNameInput = () => {
    let errorArr = validateName(inputName.value);
    if (errorArr.length === 0) {
        inputName.classList.remove("is-invalid");
        document.getElementById("profile-alert-name").classList.add("d-none");
        nameOk = true;
    }
    else {
        inputName.classList.add("is-invalid");
        document.getElementById("profile-alert-name").classList.remove("d-none");
        document.getElementById("profile-alert-name").innerHTML =
            errorArr.join("<br>");
        nameOk = false;
    }
    checkIfCanEnableBtn();
};
const checkEmailInput = () => {
    let errorArr = validateEmail(inputEmail.value);
    if (errorArr.length === 0) {
        inputEmail.classList.remove("is-invalid");
        document.getElementById("profile-alert-email").classList.add("d-none");
        emailOk = true;
    }
    else {
        inputEmail.classList.add("is-invalid");
        document.getElementById("profile-alert-email").classList.remove("d-none");
        document.getElementById("profile-alert-email").innerHTML =
            errorArr.join("<br>");
        emailOk = false;
    }
    checkIfCanEnableBtn();
};
const checkPasswordInput = () => {
    let errorArr = validatePassword(inputPassword.value);
    if (errorArr.length === 0) {
        inputPassword.classList.remove("is-invalid");
        document.getElementById("profile-alert-password").classList.add("d-none");
        passwordOk = true;
    }
    else {
        inputPassword.classList.add("is-invalid");
        document.getElementById("profile-alert-password").classList.remove("d-none");
        document.getElementById("profile-alert-password").innerHTML = errorArr.join("<br>");
        passwordOk = false;
    }
    checkIfCanEnableBtn();
};
const checkIfCanEnableBtn = () => (btnProfile.disabled = !(nameOk && emailOk && passwordOk));
btnProfile.addEventListener("click", () => {
    if (!(nameOk && emailOk && passwordOk)) {
        return;
    }
    let usersStr = localStorage.getItem("users");
    let tokenStr = localStorage.getItem("token");
    let users;
    let token;
    if (usersStr && tokenStr) {
        users = JSON.parse(usersStr);
        token = JSON.parse(tokenStr);
        let userEmail = users.find((item) => item.email === inputEmail.value);
        let user = users.find((item) => item.id === token.id);
        if (!user) {
            return;
        }
        if (userEmail && user.id !== userEmail.id) {
            showToast("The email already taken", false);
            return;
        }
        if (user) {
            user.name = token.name = inputName.value;
            user.email = token.email = inputEmail.value;
            user.password = inputPassword.value;
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("token", JSON.stringify(token));
            showToast("Saved");
        }
    }
    setTimeout(() => {
        location.reload();
    }, 3000);
});
