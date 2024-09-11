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
  !*** ./signup.ts ***!
  \*******************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const UserServices_1 = __webpack_require__(/*! ./services/UserServices */ "./services/UserServices.ts");
const userRepo = new UserServices_1.UserRepository();
// Parse the UserArray from localStorage
let UserArray = userRepo.UsersLocalStorage();
console.log(UserArray);
// Retrieve elements by ID and type cast them
const userName = document.getElementById('name');
const userEmail = document.getElementById('email');
const userPasscode = document.getElementById('password');
const userConfirmPasscode = document.getElementById('confirm-password');
const UserSubmitbutton = document.getElementById('submit-button');
const confirmPasswordError = document.getElementById('confirm-password-error');
const PasswordError = document.getElementById('password-error');
const emailError = document.getElementById('email-error');
const nameError = document.getElementById('name-error');
let isValid = true;
userName.onblur = function () {
    if (userName.value === "") {
        nameError.innerText = 'The name field is empty.*';
        isValid = false;
    }
    else if (!isNaN(Number(userName.value))) {
        nameError.innerText = 'Please enter a valid name.*';
        isValid = false;
    }
    else {
        nameError.innerText = '';
        isValid = true;
    }
};
userEmail.onblur = function () {
    if (userEmail.value === "") {
        emailError.innerText = 'The email field is empty.*';
        isValid = false;
    }
    else {
        emailError.innerText = '';
        isValid = true;
    }
};
userPasscode.onblur = function () {
    if (userPasscode.value === "") {
        PasswordError.innerText = 'The password field is empty.*';
        isValid = false;
    }
    else {
        PasswordError.innerText = '';
        isValid = true;
    }
};
userConfirmPasscode.onblur = function () {
    if (userConfirmPasscode.value === "") {
        confirmPasswordError.innerText = 'The confirm password field is empty.*';
        isValid = false;
    }
    else {
        confirmPasswordError.innerText = '';
        isValid = true;
    }
};
UserSubmitbutton.onclick = function (event) {
    event.preventDefault();
    if (isValid) {
        let usersName = userName.value;
        let usersEmail = userEmail.value;
        let usersPasscode = userPasscode.value;
        let usersConfirmPasscode = userConfirmPasscode.value;
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(usersPasscode);
        const hasLowerCase = /[a-z]/.test(usersPasscode);
        if (usersPasscode.length < minLength) {
            PasswordError.innerText = `Password must be at least ${minLength} characters long.*`;
            return;
        }
        else if (!hasUpperCase) {
            PasswordError.innerText = 'Password must contain one uppercase letter.*';
            return;
        }
        else if (!hasLowerCase) {
            PasswordError.innerText = 'Password must contain one lowercase letter.*';
            return;
        }
        else if (usersPasscode === usersConfirmPasscode) {
            const newUser = {
                name: usersName,
                email: usersEmail,
                password: usersPasscode,
                loggedStatus: "out",
            };
            userRepo.addUser(newUser);
        }
        else {
            confirmPasswordError.innerText = 'The confirm passcode must match the passcode.*';
            return;
        }
    }
    else {
        confirmPasswordError.innerText = "Ensure the fields are valid before submit.*";
    }
};

})();

/******/ })()
;
//# sourceMappingURL=signup.bundle.js.map