import { Component } from '@angular/core';
import { UserStorageService } from '../../../Storage/user-storage.service';
//import { TranactionsService } from '../../../Services/tranactions.service';
import { userdetails } from '../../../models/Usermodel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userName!: string;
  constructor(
    private userStorage: UserStorageService,
    // private transactionService: TranactionsService,
    private route: Router
  ) {}

  ngOnInit(): void {
    const user: userdetails = this.userStorage.getUserDetail();
    //const index = this.transactionService.getLoggedUserIndex();
    this.userName = user.name;
    console.log(user.name);
    console.log(this.userName);
  }

  logout() {
    sessionStorage.clear();
    this.route.navigate(['/']);
  }
}
