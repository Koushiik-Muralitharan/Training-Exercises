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
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  //const today = new Date().toISOString().split('T')[0];
  //selectedDate!:string;
  taskCount:number = 0;
  username!:string;
  tasks: Task[] = [];
  // activityArray:Activity[] =[];
  activityArray: { task: Task; activities: Activity }[] = [];
  currentUserId!: number;
  task: Task = new Task();
  user: User = new User();
  activity: Activity = new Activity();
  TaskService = inject(TaskService);
  UserService = inject(UserService);
  ActivityService = inject(ActivityService);
  users:User = this.UserService.GetLoggedUserFromSession(); 
  constructor(private router: Router) {}
  ngOnInit(){
    const user:User = this.UserService.GetLoggedUserFromSession();
    this.username = user.userName;
    console.log(this.username);
    this.TasksCount();
  }
  GetTasks(event: Event) {
    this.TasksCount();
    const date = (event.target as HTMLInputElement).value;
    console.log('Selected date:', date);
    //this.selectedDate = date;
    const user: User = this.UserService.GetLoggedUserFromSession();
    this.currentUserId = user.userId;
    this.tasks = [];
    this.activityArray = [];
    this.TaskService.GetTask(date, this.currentUserId).subscribe({
      next: (res: any) => {
        if (res) {
          //alert('recieved the tasks');
          this.tasks = res;
          console.log(res);
          if (this.tasks.length > 0) {
            this.tasks.forEach((task) => {
              this.ActivityService.GetActivity(task.taskId).subscribe({
                next: (activities: Activity[]) => {
                  console.log(
                    `Activities for Task ${task.taskId}:`,
                    activities
                  );
                  activities.forEach((activity) => {
                    this.activityArray.push({
                      task: task,
                      activities: activity,
                    });
                  });

                  console.log('Updated activityArray:', this.activityArray);
                },
              });
            });
          }
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          alert('cannot get tasks');
        } else if (error.status === 500) {
          alert('Internal server error: ' + error.error);
        } else {
          alert('Unexpected error occurred.');
        }
      },
    });
  }

  DeleteTask(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.TaskService.DeleteTask(taskId).subscribe({
        next: (response: any) => {
          alert(response.message);
          this.tasks = this.tasks.filter((task) => task.taskId !== taskId);
          this.TasksCount();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            alert('Task cannot be deleted.');
          } else if (error.status === 500) {
            alert('Internal server error: ' + error.error);
          } else {
            alert('Unexpected error occurred.');
          }
        },
      });
    }
  }

  AddActivity(taskId: number) {
    sessionStorage.setItem('CurrentTaskId', JSON.stringify(taskId));
    this.router.navigate(['/taskpage']);
  }

  EditTask(task:Task){
        console.log(task);
        sessionStorage.setItem('editForTask',JSON.stringify(task.taskId));
        this.router.navigate(['/taskpage']);
  }

  TasksCount(){
      this.TaskService.TotalTaskCount(this.users.userId).subscribe({
        next: (res)=>{
          this.taskCount = res;
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            alert('Task cannot be counted.');
          } else if (error.status === 500) {
            alert('Internal server error: ' + error.error);
          } else {
            alert('Unexpected error occurred.');
          }
        }
      })

  }
}
