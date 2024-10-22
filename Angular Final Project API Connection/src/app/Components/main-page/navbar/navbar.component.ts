import { Component } from '@angular/core';
import { UserStorageService } from '../../../Storage/user-storage.service';
import { TranactionsService } from '../../../Services/tranactions.service';
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
    private transactionService: TranactionsService,
    private route: Router
  ) {}

  ngOnInit(): void {
    const userArray: userdetails[] = this.userStorage.getUser();
    const index = this.transactionService.getLoggedUserIndex();
    this.userName = userArray[index].name;
  }

  logout() {
    sessionStorage.clear();
    this.route.navigate(['/']);
  }
}
