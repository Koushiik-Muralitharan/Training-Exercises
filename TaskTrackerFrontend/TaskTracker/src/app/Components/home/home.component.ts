import { Component, inject } from '@angular/core';
import { Task } from '../../Modal/Task';
import { User } from '../../Modal/User';
import { Activity } from '../../Modal/Activity';
import { TaskService } from '../../Services/task.service';
import { UserService } from '../../Services/user.service';
import { ActivityService } from '../../Services/activity.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router:Router){}
  //selectedDate!:string;
  tasks:Task[] = [];
  // activityArray:Activity[] =[];
  activityArray: { task: Task; activities: Activity[] }[] = [];
  currentUserId!:number;
  task:Task = new Task();
  user:User = new User();
  activity:Activity = new Activity();
  TaskService = inject(TaskService);
  UserService = inject(UserService);
  ActivityService = inject(ActivityService);
  GetTasks(event: Event){
    const date = (event.target as HTMLInputElement).value;
    console.log('Selected date:', date);
    //this.selectedDate = date;
    const user:User = this.UserService.GetLoggedUserFromSession();
    this.currentUserId = user.userId;
    this.tasks = [];
    this.activityArray = [];
    this.TaskService.GetTask(date, this.currentUserId).subscribe({
      next: (res:any) => {
        if (res){
            alert("recieved the tasks");
            this.tasks = res;
            console.log(res);
            if(this.tasks.length>0){
              this.tasks.forEach(task => {
                this.ActivityService.GetActivity(task.taskId).subscribe({
                  next: (activities: Activity[]) => {
                    console.log(`Activities for Task ${task.taskId}:`, activities);
                    activities.forEach(activity => {
                      this.activityArray.push({ task: task, activities: activities });
                    });
    
                    console.log('Updated activityArray:', this.activityArray);
                    
                  }
                })
              });
            }
        }
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 400){
         alert('cannot get tasks');
        }
        else if (error.status === 500) {
         alert('Internal server error: ' + error.error);
       } else {
         alert('Unexpected error occurred.');
       }
      }
    })
  }

  DeleteTask(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.TaskService.DeleteTask(taskId).subscribe({
        next: (response: any) => {
          alert(response.message);
          this.tasks = this.tasks.filter(task => task.taskId !== taskId);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            alert('Task cannot be deleted.');
          } else if (error.status === 500) {
            alert('Internal server error: ' + error.error);
          } else {
            alert('Unexpected error occurred.');
          }
        }
      });
    }
  }

  AddActivity(taskId: number){
    sessionStorage.setItem('CurrentTaskId', JSON.stringify(taskId));
    this.router.navigate(['/taskpage']);
  }
}
