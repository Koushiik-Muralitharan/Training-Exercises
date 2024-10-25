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
  
  // constructor(private router: Router){}
  // task:Task = new Task();
  // user:User = new User();
  // activity:Activity = new Activity();
  // TaskService = inject(TaskService);
  // UserService = inject(UserService);
  // ActivityService = inject(ActivityService);
  // onSaveTask(form:NgForm){
  //   if(form.invalid){
  //     alert('Please fill out the form correctly.');
  //     return;
  //   }
  //   this.user = this.UserService.GetLoggedUserFromSession();
  //   this.task.userId = this.user.userId;
  //   console.log("UserId:"+ this.user.userId);
    
  //   this.TaskService.AddTask(this.task).subscribe({
  //     next: (res:any)=>{
  //       alert('Task created successfully.');
  //       console.log(res.id);
  //       sessionStorage.setItem("CurrentTaskId",JSON.stringify(res.id));
  //       this.activity.taskId = this.ActivityService.GetCurrentTaskIdFromSession();
  //       form.reset();
  //     },
  //     error: (error: HttpErrorResponse) =>{
  //       if(error.status === 400){
  //         alert ('task cannot be added');
  //       }else if(error.status === 500){
  //         alert('Internal server error: ' + error.error);
  //       }
  //       else {
  //         alert('Unexpected error occurred.');
  //       }
  //     }
  //   })
  // }
  // onSaveActivity(form:NgForm){
  //   if(form.invalid){
  //     alert('Please fill out the form correctly.');
  //     return;
  //   }
  //   const taskId:number = this.ActivityService.GetCurrentTaskIdFromSession();
  //   if(taskId != -1){
  //     this.ActivityService.AddActivity(this.activity).subscribe({
  //          next: (res: any) => {
  //           if (res) {
  //             alert("Activity added successfully");
  //           }
  //          },
  //          error: (error: HttpErrorResponse) => {
  //            if(error.status === 400){
  //             alert('cannot add activity');
  //            }
  //            else if (error.status === 500) {
  //             alert('Internal server error: ' + error.error);
  //           } else {
  //             alert('Unexpected error occurred.');
  //           }
  //          }
  //     })
  //   }else{
  //     alert('Add a task to add activity');
  //   }
  // }
}
