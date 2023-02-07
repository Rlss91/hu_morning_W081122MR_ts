import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import User from "../models/User.js";

const loginEmailInput = document.querySelector(
  "#login-input-email"
) as HTMLInputElement;
const loginPasswordInput = document.querySelector(
  "#login-input-password"
) as HTMLInputElement;
const loginBtn = document.querySelector("#login-btn") as HTMLButtonElement;

loginEmailInput.addEventListener("input", (): void => {
  let errorArr = validateEmail(loginEmailInput.value);
  if (errorArr.length === 0) {
    //no error
    loginEmailInput.classList.remove("is-invalid");
    (document.getElementById("login-alert-email") as HTMLElement).classList.add(
      "d-none"
    );
  } else {
    // error/s
    loginEmailInput.classList.add("is-invalid");
    (
      document.getElementById("login-alert-email") as HTMLElement
    ).classList.remove("d-none");
    (document.getElementById("login-alert-email") as HTMLElement).innerHTML =
      errorArr.join("<br>");
    /*
        let str = errorArr.join("<br>")
        document.getElementById("login-alert-email").innerHTML = str
      */
  }
});

loginPasswordInput.addEventListener("input", (): void => {
  let errorArr = validatePassword(loginPasswordInput.value);
  if (errorArr.length === 0) {
    //no error
    loginPasswordInput.classList.remove("is-invalid");
    (
      document.getElementById("login-alert-password") as HTMLElement
    ).classList.add("d-none");
  } else {
    // error/s
    loginPasswordInput.classList.add("is-invalid");
    (
      document.getElementById("login-alert-password") as HTMLElement
    ).classList.remove("d-none");
    (document.getElementById("login-alert-password") as HTMLElement).innerHTML =
      errorArr.join("<br>");
    /*
        let str = errorArr.join("<br>")
        document.getElementById("login-alert-password").innerHTML = str
      */
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
  let users = JSON.parse(usersStr) as User[];
  let user = users.find(
    (item: User): boolean =>
      item.email === loginEmailInput.value &&
      item.password === loginPasswordInput.value
  );
  if (!user) {
    console.log("invalid email and/or password");
    return;
  }
  //remember who connected
  localStorage.setItem(
    "token",
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  );
  // handlePageChange(PAGES.HOME);
  location.reload(); // refresh the page
});
