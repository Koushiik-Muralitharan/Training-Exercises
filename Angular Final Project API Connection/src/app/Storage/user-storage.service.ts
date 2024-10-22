import { Injectable } from '@angular/core';
import { userdetails } from '../models/Usermodel';
import { transactionDetails } from '../models/Transactionmodel';
import { userdetail } from '../models/GetUserModel';
@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  constructor() {}

  getUser(): userdetails[] {
    const users = JSON.parse(sessionStorage.getItem('loggedInuser') || '[]');
    return users;
  }

  getUserDetail(): userdetails {
    const users = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
    return users;
  }

  getUserDetailing(): userdetail {
    const users = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
    return users;
  }


  setUser(userArray: userdetails[]): void {
    localStorage.setItem('users', JSON.stringify(userArray));
  }
}
