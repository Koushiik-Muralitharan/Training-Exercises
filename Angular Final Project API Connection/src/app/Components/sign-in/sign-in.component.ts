import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { userdetails } from '../../models/Usermodel';
import { UserStorageService } from '../../Storage/user-storage.service';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  canlogin!:Boolean;
  userArray: userdetails[] = [];
  constructor(private userServices:UserService, private router: Router){}

  onLogin(logindata: NgForm) {
    const { loginemail, loginpassword } = logindata.value;

    // Check if the user exists and validate credentials using the API
    this.userServices.getLoggedUser(loginemail, loginpassword).subscribe({
      next: (loggedUser) => {
        // If a user is found, save user details to session storage and redirect
        sessionStorage.setItem('loggedInUser', JSON.stringify(loggedUser));
        console.log(loggedUser);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        // Handle error (invalid credentials)
        alert('Invalid email Id or password');
        console.error(error);
      }
    });
  }
}
