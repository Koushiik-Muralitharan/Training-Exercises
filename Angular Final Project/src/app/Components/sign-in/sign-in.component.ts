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

  onLogin(logindata: NgForm){
     //console.log(logindata);
     const {loginemail,loginpassword} = logindata.value
     this.canlogin = this.userServices.LoginUserExists(logindata);
     //console.log(this.canlogin);
     if(this.canlogin){
        const loggedUerArray = this.userServices.getLoggedUser(loginemail);
        this.userArray = loggedUerArray ;
        const loggedUser: userdetails = loggedUerArray[0];
        sessionStorage.setItem('loggedInUser', JSON.stringify(loggedUser));
      this.router.navigate(['/home']);
     }else{
      if(this.userServices.EmailExists(loginemail)){
        alert('Invalid email Id or password');
      }else{
        this.router.navigate(['/register']);
      }
     }
  }
}
