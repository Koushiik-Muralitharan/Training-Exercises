"use strict";
var UserManager = /** @class */ (function () {
    function UserManager() {
        this.users = [];
    }
    UserManager.prototype.checkIfUserExists = function (userAccount) {
        return this.users.some(function (user) { return user.email === userAccount.email; });
    };
    UserManager.prototype.addUser = function (userAccount) {
        var result = this.checkIfUserExists(userAccount);
        if (!result) {
            refreshForm();
            this.users.push(userAccount);
            this.displayUsers();
        }
        else {
            mainErrors.innerText = 'User already exists.';
        }
    };
    UserManager.prototype.editUser = function (userData, userID) {
        var index = this.users.findIndex(function (user) { return user.id === userID; });
        this.users[index] = userData;
        this.displayUsers();
    };
    UserManager.prototype.deleteUser = function (userDelete) {
        this.users = this.users.filter(function (user) { return user.id != userDelete.id; });
        this.displayUsers();
    };
    UserManager.prototype.displaySingleUser = function (foundUser) {
        var tableContents = document.getElementById("User-display-table");
        tableContents.innerHTML = "";
        this.users.forEach(function (user, index) {
            if (user.id == foundUser.id) {
                createData(user, index);
            }
        });
    };
    UserManager.prototype.displayUsers = function () {
        var tableContents = document.getElementById("User-display-table");
        tableContents.innerHTML = "";
        this.users.forEach(function (user, index) { return createData(user, index); });
    };
    return UserManager;
}());
var user = new UserManager();
//Generic Part
var findUser = /** @class */ (function () {
    function findUser() {
    }
    findUser.prototype.searchAndDisplay = function (searchValue, searchField) {
        var foundUser = user.users.find(function (u) { return u[searchField] === searchValue; });
        if (foundUser) {
            searchContent.value = "";
            user.displaySingleUser(foundUser);
        }
        else {
            var noUser_1 = document.getElementById("no-user");
            noUser_1.innerText = "There is no such user exists.";
        }
    };
    return findUser;
}());
var userEdit = false;
var userID;
//template of the row to be created.
function createData(userData, index) {
    var userTable = document.getElementById("User-display-table");
    var userRow = document.createElement("tr");
    var nameCell = document.createElement("td");
    nameCell.innerText = "".concat(index + 1, ".  ").concat(userData.name);
    userRow.appendChild(nameCell);
    var idCell = document.createElement("td");
    idCell.innerText = "".concat(userData.id);
    userRow.appendChild(idCell);
    var emailCell = document.createElement("td");
    emailCell.innerText = userData.email;
    userRow.appendChild(emailCell);
    var roleCell = document.createElement("td");
    roleCell.innerText = userData.role;
    roleCell.classList.add("role-td");
    userRow.appendChild(roleCell);
    var actionCell = document.createElement("td");
    actionCell.classList.add("button-td");
    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.onclick = function () {
        nameField.value = userData.name;
        emailField.value = userData.email;
        roleField.value = userData.role;
        userEdit = true;
        userID = userData.id;
        nameError.innerText = "";
        emailError.innerText = "";
    };
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function () {
        user.deleteUser(userData);
    };
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
    userRow.appendChild(actionCell);
    userTable.appendChild(userRow);
}
var searchContent = document.getElementById("user-search-field");
var nameField = document.getElementById("name-field");
var emailField = document.getElementById("email-field");
var roleField = document.getElementById("select-field");
var displayAll = document.getElementById("user-display-all");
var searchButton = document.getElementById("user-search");
var formButton = document.getElementById("formButton");
var nameError = document.getElementById("display-name-error");
var emailError = document.getElementById("display-email-error");
var noUser = document.getElementById("no-user");
var mainErrors = document.getElementById('display-main-error');
var isValid = true;
displayAll.onclick = function () {
    if (user.users.length === 0) {
        noUser.innerText = "Please add users to display.";
    }
    else {
        noUser.innerText = "";
        user.displayUsers();
    }
};
//search
searchButton.onclick = function () {
    if (user.users.length === 0) {
        noUser.innerText = "Please add users to search.";
    }
    else {
        noUser.innerText = "";
        var searchData = searchContent.value;
        var idsearch = parseInt(searchData);
        if (!isNaN(idsearch)) {
            var findUserById = new findUser();
            findUserById.searchAndDisplay(idsearch, "id");
        }
        else {
            var findUserByEmail = new findUser();
            findUserByEmail.searchAndDisplay(searchData, "email");
        }
    }
};
//validation part
nameField.onblur = function () {
    var userName = nameField.value;
    if (userName === "") {
        nameError.innerText = "The name field is empty.";
        isValid = false;
    }
    else {
        nameError.innerText = "";
        isValid = true;
    }
};
emailField.onblur = function () {
    var userEmail = emailField.value;
    if (userEmail === "") {
        emailError.innerText = "The email field is empty.";
        isValid = false;
    }
    else {
        emailError.innerText = "";
        isValid = true;
    }
};
//refresh function
function refreshForm() {
    nameField.value = "";
    emailField.value = "";
    noUser.innerText = "";
}
formButton.onclick = function (event) {
    event.preventDefault();
    if (userEdit) {
        var userRole = roleField.value;
        var userName = nameField.value;
        var userEmail_1 = emailField.value;
        var isEmailExist = user.users.some(function (user) { return user.email === userEmail_1 && user.id !== userID; });
        if (isEmailExist) {
            mainErrors.innerText = "Email already exists. Please provide a unique email.";
            return;
        }
        if (isValid && userRole) {
            mainErrors.innerText = "";
            var userDetails = {
                name: userName,
                email: userEmail_1,
                role: userRole,
                id: userID,
            };
            userEdit = false;
            user.editUser(userDetails, userID);
            refreshForm();
        }
        else {
            mainErrors.innerText = "Please provide the details correctly.";
        }
    }
    else {
        var userName = nameField.value;
        var userEmail = emailField.value;
        var userRole = roleField.value;
        var usercode = Math.floor(Math.random() * 90) + 10;
        if (isValid && userName && userEmail && userRole) {
            mainErrors.innerText = "";
            var userDetails = {
                id: usercode,
                name: userName,
                email: userEmail,
                role: userRole,
            };
            user.addUser(userDetails);
            console.log(user.users);
        }
        else {
            mainErrors.innerText = "Please provide the details correctly.";
        }
    }
};
