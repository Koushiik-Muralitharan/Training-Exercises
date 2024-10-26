import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../Modal/Task';
import { Router } from '@angular/router';
import { TaskService } from '../../Services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../Services/user.service';
import { User } from '../../Modal/User';
import { ActivityService } from '../../Services/activity.service';
import { Activity } from '../../Modal/Activity';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
@Component({
  selector: 'app-add-task-page',
  standalone: true,
  imports: [FormsModule,CommonModule,AddTaskComponent,AddActivityComponent],
  templateUrl: './add-task-page.component.html',
  styleUrl: './add-task-page.component.css'
})
export class AddTaskPageComponent {
  username!:string;
  UserService = inject(UserService);
  user:User = new User();
  constructor(){}

  ngOnInit(){
    this.user = this.UserService.GetLoggedUserFromSession();
    this.username = this.user.userName;
  }

  
}
