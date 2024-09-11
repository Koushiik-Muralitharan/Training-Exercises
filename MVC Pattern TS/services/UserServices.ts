import { User } from "../models/models";
export class UserRepository {
  public localstorageuserKey = "UserArray";
  public users: User[] = [];

  constructor() {
    this.users = this.UsersLocalStorage();
  }

  public UsersLocalStorage(): User[] {
    const storedUser = localStorage.getItem(this.localstorageuserKey);
    return storedUser ? JSON.parse(storedUser) : [];
  }

  public saveUsersToLocalStorage(): void {
    localStorage.setItem(this.localstorageuserKey, JSON.stringify(this.users));
  }

  public checkIfUserExists(useremail: string): boolean {
    return this.users.some((user) => user.email === useremail);
  }

  public addUser(user: User): void {
    let result = this.checkIfUserExists(user.email);
    if (result) {
      const confirmPasswordError = document.getElementById(
        "confirm-password-error"
      ) as HTMLElement;
      confirmPasswordError.innerText = "User with this email already exists.";
      return;
    }
    this.users.push(user);
    this.saveUsersToLocalStorage();
    //this.renderUsers();
    window.location.href = "index.html";
    console.log("User Added:", user);
  }

  public getLoggedUser(userArray: User[]): User | null {
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
