import { UserRepository } from "./services/UserServices";
import bcrypt from "bcryptjs";
const usersRepo = new UserRepository();

// Retrieve elements by ID and type cast them
const emailId = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const displayError = document.getElementById("display-error") as HTMLElement;
const loginButton = document.getElementById(
  "login-button"
) as HTMLButtonElement;
const emailErrors = document.getElementById("email-error") as HTMLElement;
const passcodeError = document.getElementById("passcode-error") as HTMLElement;

if (!localStorage.getItem("UserArray")) {
  displayError.innerText = "Please sign up to login.*";
}

let isValids = true;

emailId.onblur = function () {
  if (emailId.value === "") {
    emailErrors.innerText = "Enter the email.*";
    isValids = false;
  } else {
    emailErrors.innerText = "";
    isValids = true;
  }
};

password.onblur = function () {
  if (password.value === "") {
    passcodeError.innerText = "Enter the password.*";
    isValids = false;
  } else {
    passcodeError.innerText = "";
    isValids = true;
  }
};

loginButton.onclick = async function (event: Event) {
  event.preventDefault();

  if (!isValids) {
    displayError.innerText = "Please fill in all required fields.*";
    return;
  }
  const userPresent = usersRepo.users.some(
    (user) => user.email === emailId.value
  );

  if (userPresent) {
    const emailValue = emailId.value;
    const passwordValue = password.value;

    let userExists = false;

    for (const user of usersRepo.users) {
      if (user.email === emailValue) {
        const isMatch = await bcrypt.compare(passwordValue, user.password);
        if (isMatch) {
          user.loggedStatus = "in";
          userExists = true;
          usersRepo.saveUsersToLocalStorage();
          window.location.href = "Main.htm";
          break;
        }
      }
    }

    if (!userExists) {
      displayError.innerText = "Invalid email or password.*";
    }
  } else {
    displayError.innerText = "Please signup to login.*";
  }
};
