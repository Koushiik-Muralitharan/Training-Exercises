/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./services/UserServices.ts":
/*!**********************************!*\
  !*** ./services/UserServices.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
class UserRepository {
    constructor() {
        this.localstorageuserKey = "UserArray";
        this.users = [];
        this.users = this.UsersLocalStorage();
    }
    UsersLocalStorage() {
        const storedUser = localStorage.getItem(this.localstorageuserKey);
        return storedUser ? JSON.parse(storedUser) : [];
    }
    saveUsersToLocalStorage() {
        localStorage.setItem(this.localstorageuserKey, JSON.stringify(this.users));
    }
    checkIfUserExists(useremail) {
        return this.users.some((user) => user.email === useremail);
    }
    addUser(user) {
        let result = this.checkIfUserExists(user.email);
        if (result) {
            const confirmPasswordError = document.getElementById("confirm-password-error");
            confirmPasswordError.innerText = "User with this email already exists.";
            return;
        }
        this.users.push(user);
        this.saveUsersToLocalStorage();
        //this.renderUsers();
        window.location.href = "index.html";
        console.log("User Added:", user);
    }
    getLoggedUser(userArray) {
        let userAccounts = userArray.filter((user) => user.loggedStatus.trim().toLowerCase() === "in");
        if (userAccounts.length === 0) {
            console.log("No users found with loggedStatus 'in'");
            return null;
        }
        let userAccount = userAccounts[0];
        console.log(`The logged user: ${userAccount}`);
        return userAccount;
    }
}
exports.UserRepository = UserRepository;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!*******************!*\
  !*** ./signin.ts ***!
  \*******************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const UserServices_1 = __webpack_require__(/*! ./services/UserServices */ "./services/UserServices.ts");
const usersRepo = new UserServices_1.UserRepository();
// Retrieve elements by ID and type cast them
const emailId = document.getElementById('email');
const password = document.getElementById('password');
const displayError = document.getElementById('display-error');
const loginButton = document.getElementById('login-button');
const emailErrors = document.getElementById('email-error');
const passcodeError = document.getElementById('passcode-error');
if (!localStorage.getItem("UserArray")) {
    displayError.innerText = "Please sign up to login.*";
}
let isValids = true;
emailId.onblur = function () {
    if (emailId.value === "") {
        emailErrors.innerText = "Enter the email.*";
        isValids = false;
    }
    else {
        emailErrors.innerText = "";
        isValids = true;
    }
};
password.onblur = function () {
    if (password.value === "") {
        passcodeError.innerText = "Enter the password.*";
        isValids = false;
    }
    else {
        passcodeError.innerText = "";
        isValids = true;
    }
};
loginButton.onclick = function (event) {
    event.preventDefault();
    if (!isValids) {
        displayError.innerText = "Please fill in all required fields.*";
        return;
    }
    const emailValue = emailId.value;
    const passwordValue = password.value;
    if (emailValue === 'admin@gmail.com' && passwordValue === "admin") {
        window.location.href = "admin.htm";
    }
    if (usersRepo.checkIfUserExists(emailValue)) {
        emailId.value = "";
        password.value = "";
        const userExists = usersRepo.users.some(user => user.email === emailValue && user.password === passwordValue);
        usersRepo.users.forEach((user) => {
            if (user.email === emailValue && user.password === passwordValue) {
                user.loggedStatus = "in";
            }
        });
        usersRepo.saveUsersToLocalStorage();
        if (userExists) {
            window.location.href = "Main.htm";
        }
        else {
            displayError.innerText = "Invalid email or password.*";
        }
    }
    else {
        displayError.innerText = "User does not exist. Please sign up.*";
    }
};

})();

/******/ })()
;
//# sourceMappingURL=signin.bundle.js.map