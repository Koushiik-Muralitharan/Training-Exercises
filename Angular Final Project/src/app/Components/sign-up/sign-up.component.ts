import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { MatchpasswordDirective } from '../../Validators/matchpassword.directive';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule,CommonModule, MatchpasswordDirective],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent  {
  
  constructor(private userServices:UserService){}

    onSubmit(form:NgForm)
    {
      this.userServices.addUser(form);
      //console.log(form.value);
      //console.log(form)
      
    }
}


