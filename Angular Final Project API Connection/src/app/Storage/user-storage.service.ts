import { Injectable } from '@angular/core';
import { userdetails } from '../models/Usermodel';
import { transactionDetails } from '../models/Transactionmodel';
@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  constructor() {}

  getUser(): userdetails[] {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users;
  }

  setUser(userArray: userdetails[]): void {
    localStorage.setItem('users', JSON.stringify(userArray));
  }
}
