import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../Modal/User';
import { UserService } from '../../Services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
    constructor(private router: Router){}
    UserService = inject(UserService);
    user:User = new User();

    onSaveUser(form:NgForm) {
      if (form.invalid) {
        alert('Please fill out the form correctly.');
        return;
      }
      this.UserService.Adduser(this.user).subscribe({
        next: (res: any) => {
          alert(res.message || 'User created successfully.');
          this.router.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            alert('Account cannot be created: ' + error.error);
          } else if (error.status === 500) {
            alert('Internal server error: ' + error.error);
          } else {
            alert('Unexpected error occurred.');
          }
        }
      });
    }
}
