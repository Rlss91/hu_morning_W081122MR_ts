import PAGES from "../models/pageModel.js";
import { handlePageChange } from "../routes/router.js";
import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import validateName from "../validation/validateName.js";
import User from "../models/User.js";
import showToast from "../services/Toast.js";

const inputName = document.getElementById(
  "register-input-name"
) as HTMLInputElement;
const inputEmail = document.getElementById(
  "register-input-email"
) as HTMLInputElement;
const inputPassword = document.getElementById(
  "register-input-password"
) as HTMLInputElement;
const btnRegister = document.querySelector(
  "#register-btn"
) as HTMLButtonElement;

let nameOk = false;
let emailOk = false;
let passwordOk = false;

window.addEventListener("load", (): void => {
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
      document.getElementById("register-alert-name") as HTMLElement
    ).classList.add("d-none");
    nameOk = true;
  } else {
    //the text is not ok
    inputName.classList.add("is-invalid");
    (
      document.getElementById("register-alert-name") as HTMLElement
    ).classList.remove("d-none");
    (document.getElementById("register-alert-name") as HTMLElement).innerHTML =
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
      document.getElementById("register-alert-email") as HTMLElement
    ).classList.add("d-none");
    emailOk = true;
  } else {
    //the text is not ok
    inputEmail.classList.add("is-invalid");
    (
      document.getElementById("register-alert-email") as HTMLElement
    ).classList.remove("d-none");
    (document.getElementById("register-alert-email") as HTMLElement).innerHTML =
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
      document.getElementById("register-alert-password") as HTMLElement
    ).classList.add("d-none");
    passwordOk = true;
  } else {
    //the text is not ok
    inputPassword.classList.add("is-invalid");
    (
      document.getElementById("register-alert-password") as HTMLElement
    ).classList.remove("d-none");
    (
      document.getElementById("register-alert-password") as HTMLElement
    ).innerHTML = errorArr.join("<br>");
    passwordOk = false;
  }
  checkIfCanEnableBtn();
};

const checkIfCanEnableBtn = (): boolean =>
  (btnRegister.disabled = !(nameOk && emailOk && passwordOk));

btnRegister.addEventListener("click", (): void => {
  if (!(nameOk && emailOk && passwordOk)) {
    //if someone changed the html from dev tools
    return;
  }
  let usersStr = localStorage.getItem("users");
  let users: User[];
  let nextUserIdStr = localStorage.getItem("nextUserId");
  if (!nextUserIdStr) {
    return;
  }
  let nextUserId = +nextUserIdStr;
  let newUser = new User(
    nextUserId++,
    inputName.value,
    inputEmail.value,
    inputPassword.value
  );
  localStorage.setItem("nextUserId", nextUserId + "");
  if (!usersStr) {
    //the first user
    users = [newUser];
    // let user = new User(inputName.value, inputEmail.value, inputPassword.value);
    // users = [user]
    localStorage.setItem("users", JSON.stringify(users));
    /*
      JSON.stringify(users) - convert array of objects to string
      localStorage.setItem - store the json string to localStorage with 
        key users 
        and value users as json string
    */
  } else {
    //we have users
    users = JSON.parse(usersStr); // convert from string to array of objects
    // console.log("users from localStorage", users);
    for (let user of users) {
      if (user.email === inputEmail.value) {
        //display msg - email already exists
        showToast("Email already exists", false);
        return;
      }
    }
    //user provided new email
    users = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(users));
  }
  handlePageChange(PAGES.LOGIN);
});
