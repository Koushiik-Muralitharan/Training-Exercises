import { Component, inject } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  userName: string = '';  
  password: string = '';  
  constructor(private router: Router){}
  UserService = inject(UserService);
 
  GetLoggedUserInfo(form:NgForm){
    if (form.invalid) {
      alert('Please fill out the form correctly.');
      return;
    }
    this.UserService.GetLoggedUserInfo(this.userName, this.password).subscribe({
         next: (res: any) => {
          if (res) {
            alert('User logged in successfully.');
            console.log(res);  
            sessionStorage.setItem('LoggedUser',JSON.stringify(res));
            this.router.navigate(['/home']);
          }
         },
         error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            alert('Invalid username or password: ' + error.error);
          } else if (error.status === 500) {
            alert('Internal server error: ' + error.error);
          } else {
            alert('Unexpected error occurred.');
          }
        }
    });
  }
}
