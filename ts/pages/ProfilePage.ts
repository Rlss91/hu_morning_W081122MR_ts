import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import validateName from "../validation/validateName.js";
import showToast from "../services/Toast.js";
import User from "../models/User.js";
import Token from "../models/Token.js";

const inputName = document.getElementById(
  "profile-input-name"
) as HTMLInputElement;
const inputEmail = document.getElementById(
  "profile-input-email"
) as HTMLInputElement;
const inputPassword = document.getElementById(
  "profile-input-password"
) as HTMLInputElement;
const btnProfile = document.querySelector("#profile-btn") as HTMLButtonElement;

let nameOk = false;
let emailOk = false;
let passwordOk = false;

window.addEventListener("load", (): void => {
  let usersStr = localStorage.getItem("users");
  let tokenStr = localStorage.getItem("token");
  let users: User[];
  let token: Token;
  if (usersStr && tokenStr) {
    //we have users
    users = JSON.parse(usersStr) as User[]; // convert from string to array of objects
    token = JSON.parse(tokenStr) as Token;
    let user = users.find((item: User): boolean => item.id === token.id);
    if (user) {
      inputName.value = user.name;
      inputEmail.value = user.email;
      inputPassword.value = user.password;
    }
  }

  //when page loaded
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

inputName.addEventListener("input", (): void => {
  checkNameInput();
});

inputEmail.addEventListener("input", (): void => {
  checkEmailInput();
});

inputPassword.addEventListener("input", (): void => {
  checkPasswordInput();
});

const checkNameInput = (): void => {
  let errorArr = validateName(inputName.value);
  //   console.log(reg.test(inputName.value));
  if (errorArr.length === 0) {
    //the text is ok
    inputName.classList.remove("is-invalid");
    (
      document.getElementById("profile-alert-name") as HTMLElement
    ).classList.add("d-none");
    nameOk = true;
  } else {
    //the text is not ok
    inputName.classList.add("is-invalid");
    (
      document.getElementById("profile-alert-name") as HTMLElement
    ).classList.remove("d-none");
    (document.getElementById("profile-alert-name") as HTMLElement).innerHTML =
      errorArr.join("<br>");
    nameOk = false;
  }
  checkIfCanEnableBtn();
};

const checkEmailInput = (): void => {
  let errorArr = validateEmail(inputEmail.value);
  if (errorArr.length === 0) {
    //the text is ok
    inputEmail.classList.remove("is-invalid");
    (
      document.getElementById("profile-alert-email") as HTMLElement
    ).classList.add("d-none");
    emailOk = true;
  } else {
    //the text is not ok
    inputEmail.classList.add("is-invalid");
    (
      document.getElementById("profile-alert-email") as HTMLElement
    ).classList.remove("d-none");
    (document.getElementById("profile-alert-email") as HTMLElement).innerHTML =
      errorArr.join("<br>");
    emailOk = false;
  }
  checkIfCanEnableBtn();
};

const checkPasswordInput = (): void => {
  let errorArr = validatePassword(inputPassword.value);
  if (errorArr.length === 0) {
    //the text is ok
    inputPassword.classList.remove("is-invalid");
    (
      document.getElementById("profile-alert-password") as HTMLElement
    ).classList.add("d-none");
    passwordOk = true;
  } else {
    //the text is not ok
    inputPassword.classList.add("is-invalid");
    (
      document.getElementById("profile-alert-password") as HTMLElement
    ).classList.remove("d-none");
    (
      document.getElementById("profile-alert-password") as HTMLElement
    ).innerHTML = errorArr.join("<br>");
    passwordOk = false;
  }
  checkIfCanEnableBtn();
};

const checkIfCanEnableBtn = (): boolean =>
  (btnProfile.disabled = !(nameOk && emailOk && passwordOk));

btnProfile.addEventListener("click", (): void => {
  if (!(nameOk && emailOk && passwordOk)) {
    //if someone changed the html from dev tools
    return;
  }
  let usersStr = localStorage.getItem("users");
  let tokenStr = localStorage.getItem("token");
  let users: User[];
  let token: Token;
  if (usersStr && tokenStr) {
    //we have users
    users = JSON.parse(usersStr) as User[]; // convert from string to array of objects
    token = JSON.parse(tokenStr) as Token;
    let userEmail = users.find(
      (item: User): boolean => item.email === inputEmail.value
    );
    let user = users.find((item: User): boolean => item.id === token.id);
    if (!user) {
      return;
    }
    if (userEmail && user.id !== userEmail.id) {
      //the email already token
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
  setTimeout((): void => {
    location.reload();
  }, 3000);
});
