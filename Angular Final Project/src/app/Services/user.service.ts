import { Injectable } from '@angular/core';
import { userdetails } from '../models/Usermodel';
import { UserStorageService } from '../Storage/user-storage.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private userStorage: UserStorageService,
    private router: Router
  ) {}

  getLoggedUser(userEmail: string): userdetails[] {
    const usersArray: userdetails[] = this.userStorage.getUser();
    return usersArray.filter((user) => user.email === userEmail);
  }

  LoginUserExists(form: NgForm): Boolean {
    const usersArray: userdetails[] = this.userStorage.getUser();
    const { loginemail, loginpassword } = form.value;
    return usersArray.some(
      (user) => user.email === loginemail && user.password === loginpassword
    );
  }

  EmailExists(userEmail: string): Boolean {
    const usersArray: userdetails[] = this.userStorage.getUser();
    return usersArray.some((user) => user.email === userEmail);
  }

  addUser(form: NgForm): void {
    const { username, userphno, useremail, userpassword } = form.value;
    if (!this.EmailExists(useremail)) {
      const newUser: userdetails = {
        id: Date.now() + '',
        name: username,
        email: useremail,
        pno: userphno,
        password: userpassword,
        transactions: [],
        goals: [],
        income: 0,
        balance: 0,
        expense: 0,
      };
      const usersArray: userdetails[] = this.userStorage.getUser();
      usersArray.push(newUser);
      this.userStorage.setUser(usersArray);
      this.router.navigate(['/']);
    } else {
      alert('user with this email already exists...');
    }
  }
}
