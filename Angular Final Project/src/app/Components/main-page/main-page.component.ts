import { Component } from '@angular/core';
import { GoalComponent } from './goal/goal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TransactionComponent } from './transaction/transaction.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [GoalComponent, NavbarComponent, TransactionComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {}
