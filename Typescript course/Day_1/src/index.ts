interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

class UserManager {
  public users: User[];

  constructor() {
    this.users = [];
  }

  private checkIfUserExists(userAccount: {email: string }) {
    return this.users.some((user: User) => user.email === userAccount.email);
  }

  addUser(userAccount: User) {
    let result: boolean = this.checkIfUserExists(userAccount);
    if (!result) {
      refreshForm();
      this.users.push(userAccount);
      this.displayUsers();
    } else {
      mainErrors.innerText='User already exists.';
    }
  }

  editUser(userData: User, userID: number) {
    let index = this.users.findIndex((user) => user.id === userID);
    this.users[index] = userData;
    
    this.displayUsers();
  }

  deleteUser(userDelete: User) {
    this.users = this.users.filter((user) => user.id != userDelete.id);
    this.displayUsers();
  }
  displaySingleUser(foundUser: User) {
    let tableContents = document.getElementById(
      "User-display-table"
    ) as HTMLTableElement;
    tableContents.innerHTML = "";
    this.users.forEach((user, index) => {
      if (user.id == foundUser.id) {
        createData(user, index);
      }
    });
  }
  displayUsers() {
    let tableContents = document.getElementById(
      "User-display-table"
    ) as HTMLTableElement;
    tableContents.innerHTML = "";
    this.users.forEach((user: User, index) => createData(user, index));
  }
}
let user = new UserManager();

//Generic Part
class findUser<T extends keyof User> {
  searchAndDisplay(searchValue: User[T], searchField: T) {
    const foundUser = user.users.find((u) => u[searchField] === searchValue);
    if (foundUser) {
      searchContent.value="";
      user.displaySingleUser(foundUser);
    } else {
      let noUser = document.getElementById("no-user") as HTMLSpanElement;
      noUser.innerText = `There is no such user exists.`;
    }
  }
}

let userEdit: boolean = false;

let userID: number;

//template of the row to be created.

function createData(userData: User, index: number): void {
  let userTable = document.getElementById(
    "User-display-table"
  ) as HTMLTableElement;

  let userRow = document.createElement("tr");

  let nameCell = document.createElement("td");
  nameCell.innerText = `${index + 1}.  ${userData.name}`;
  userRow.appendChild(nameCell);

  let idCell = document.createElement("td");
  idCell.innerText = `${userData.id}`;
  userRow.appendChild(idCell);

  let emailCell = document.createElement("td");
  emailCell.innerText = userData.email;
  userRow.appendChild(emailCell);

  let roleCell = document.createElement("td");
  roleCell.innerText = userData.role;
  roleCell.classList.add("role-td");
  userRow.appendChild(roleCell);

  let actionCell = document.createElement("td");
  actionCell.classList.add("button-td");
  let editButton = document.createElement("button");
  editButton.innerText = "Edit";

  editButton.onclick = function () {
    nameField.value = userData.name;
    emailField.value = userData.email;
    roleField.value = userData.role;
    userEdit = true;
    userID = userData.id;
    nameError.innerText="";
    emailError.innerText="";
  };

  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.onclick = function () {
    user.deleteUser(userData);
  };
  actionCell.appendChild(editButton);
  actionCell.appendChild(deleteButton);
  userRow.appendChild(actionCell);

  userTable.appendChild(userRow);
}

var searchContent = document.getElementById(
  "user-search-field"
) as HTMLInputElement;
var nameField = document.getElementById("name-field") as HTMLInputElement;
var emailField = document.getElementById("email-field") as HTMLInputElement;
var roleField = document.getElementById("select-field") as HTMLSelectElement;
let displayAll = document.getElementById(
  "user-display-all"
) as HTMLButtonElement;
let searchButton = document.getElementById("user-search") as HTMLButtonElement;
let formButton = document.getElementById("formButton") as HTMLButtonElement;
var nameError = document.getElementById(
  "display-name-error"
) as HTMLSpanElement;
var emailError = document.getElementById(
  "display-email-error"
) as HTMLSpanElement;
var noUser = document.getElementById("no-user") as HTMLSpanElement;
let mainErrors = document.getElementById('display-main-error') as HTMLSpanElement;

let isValid: boolean = true;

displayAll.onclick = function () {
  if (user.users.length === 0) {
    noUser.innerText = `Please add users to display.`;
  } else {
    noUser.innerText = ``;
    user.displayUsers();
  }
};

//search
searchButton.onclick = function () {
  if (user.users.length === 0) {
    noUser.innerText = `Please add users to search.`;
  } else {
    noUser.innerText = ``;
    let searchData = searchContent.value;
    let idsearch = parseInt(searchData);
    if (!isNaN(idsearch)) {
      const findUserById = new findUser<"id">();
      findUserById.searchAndDisplay(idsearch, "id");
    } else {
      const findUserByEmail = new findUser<"email">();
      findUserByEmail.searchAndDisplay(searchData, "email");
    }
  }
};

//validation part

nameField.onblur = function () {
  let userName: string = nameField.value;
  if (userName === "") {
    nameError.innerText = `The name field is empty.`;
    isValid = false;
  } else {
    nameError.innerText = ``;
    isValid = true;
  }
};

emailField.onblur = function () {
  let userEmail: string = emailField.value;
  if (userEmail === "") {
    emailError.innerText = `The email field is empty.`;
    isValid = false;
  } else {
    emailError.innerText = ``;
    isValid = true;
  }
};

//refresh function

function refreshForm(): void {
  nameField.value = "";
  emailField.value = "";
  noUser.innerText = ``;
}

formButton.onclick = function (event: any): void {
  event.preventDefault();
  if (userEdit) {
    
    let userRole: string = roleField.value;
    let userName: string = nameField.value;
    let userEmail: string = emailField.value;

    const isEmailExist = user.users.some((user) => user.email === userEmail && user.id !== userID);
        if (isEmailExist) {
            mainErrors.innerText = "Email already exists.";
            return;
        }
        if (isValid && userRole) {
          mainErrors.innerText="";
        let userDetails: User = {
          name: userName,
          email: userEmail,
          role: userRole,
          id: userID,
        };
        userEdit = false;
        user.editUser(userDetails, userID);
        refreshForm();
      } else {
        mainErrors.innerText = `Please provide the details correctly.`;
      }  
  } else {
    let userName: string = nameField.value;
    let userEmail: string = emailField.value;
    let userRole: string = roleField.value;
    let usercode: number = Math.floor(Math.random() * 90) + 10;

    if (isValid && userName && userEmail && userRole) {
        mainErrors.innerText="";
      let userDetails: User = {
        id: usercode,
        name: userName,
        email: userEmail,
        role: userRole,
      };
      user.addUser(userDetails);
      console.log(user.users);
      
    } else {
      mainErrors.innerText = `Please provide the details correctly.`;
    }
  }
};
