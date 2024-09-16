import { UserRepository } from "./services/UserServices";
import { User } from "./models/models";
import bcrypt from 'bcryptjs';
const userRepo = new UserRepository();


// Parse the UserArray from localStorage
let UserArray: User[] = userRepo.UsersLocalStorage();
console.log(UserArray);

// Retrieve elements by ID and type cast them
const userName = document.getElementById('name') as HTMLInputElement;
const userEmail = document.getElementById('email') as HTMLInputElement;
const userPasscode = document.getElementById('password') as HTMLInputElement;
const userConfirmPasscode = document.getElementById('confirm-password') as HTMLInputElement;
const UserSubmitbutton = document.getElementById('submit-button') as HTMLButtonElement;
const confirmPasswordError = document.getElementById('confirm-password-error') as HTMLElement;
const PasswordError = document.getElementById('password-error') as HTMLElement;
const emailError = document.getElementById('email-error') as HTMLElement;
const nameError = document.getElementById('name-error') as HTMLElement;

let isValid = true;

userName.onblur = function() {
    if (userName.value === "") {
        nameError.innerText = 'The name field is empty.*';
        isValid = false;
    } else if (!isNaN(Number(userName.value))) {
        nameError.innerText = 'Please enter a valid name.*';
        isValid = false;
    } else {
        nameError.innerText = '';
        isValid = true;
    }
}

userEmail.onblur = function() {
    if (userEmail.value === "") {
        emailError.innerText = 'The email field is empty.*';
        isValid = false;
    } else {
        emailError.innerText = '';
        isValid = true;
    }
}
userPasscode.onblur = function() {
    
    if (userPasscode.value === "") {
        PasswordError.innerText = 'The password field is empty.*';
        isValid = false;
    }else {
        PasswordError.innerText = '';
        isValid = true;
    }
}

userConfirmPasscode.onblur = function() {
    if (userConfirmPasscode.value === "") {
        confirmPasswordError.innerText = 'The confirm password field is empty.*';
        isValid = false;
    } else {
        confirmPasswordError.innerText = '';
        isValid = true;
    }
}

UserSubmitbutton.onclick = function(event: Event) {
    event.preventDefault();

    if (isValid) {
        let usersName = userName.value;
        let usersEmail = userEmail.value;
        let usersPasscode = userPasscode.value;
        let usersConfirmPasscode = userConfirmPasscode.value;
        
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(usersPasscode);
        const hasLowerCase = /[a-z]/.test(usersPasscode);
        const salt = 10;
        if (usersPasscode.length < minLength) {
            PasswordError.innerText = `Password must be at least ${minLength} characters long.*`;
            return;
        } else if (!hasUpperCase) {
            PasswordError.innerText = 'Password must contain one uppercase letter.*';
            return;
        } else if (!hasLowerCase) {
            PasswordError.innerText = 'Password must contain one lowercase letter.*';
            return;
        } else if (usersPasscode === usersConfirmPasscode) {
            bcrypt.hash(usersPasscode, salt, (error, hash)=>{
                if(error){
                    console.log(error);
                }else{
                    const newUser: User = {
                        name: usersName,
                        email: usersEmail,
                        password: hash,
                        loggedStatus: "out",
                      };
                      userRepo.addUser(newUser);
                }
           })
              
        } else {
            confirmPasswordError.innerText = 'The confirm passcode must match the passcode.*';
            return;
        }
    } else {
        confirmPasswordError.innerText = "Ensure the fields are valid before submit.*";
    }
}


