import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskService } from '../../../Services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../Services/user.service';
import { User } from '../../../Modal/User';
import { Task } from '../../../Modal/Task';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
    
  constructor(private router: Router){}
  task:Task = new Task();
  user:User = new User();
  TaskService = inject(TaskService);
  UserService = inject(UserService);

  onSaveTask(form:NgForm){
    if(form.invalid){
      alert('Please fill out the form correctly.');
      return;
    }
    this.user = this.UserService.GetLoggedUserFromSession();
    this.task.userId = this.user.userId;
    console.log("UserId:"+ this.user.userId);
    
    this.TaskService.AddTask(this.task).subscribe({
      next: (res:any)=>{
        alert('Task created successfully.');
        console.log(res.id);
        sessionStorage.setItem("CurrentTaskId",JSON.stringify(res.id));
        //this.activity.taskId = this.ActivityService.GetCurrentTaskIdFromSession();
        form.reset();
      },
      error: (error: HttpErrorResponse) =>{
        if(error.status === 400){
          alert ('task cannot be added');
        }else if(error.status === 500){
          alert('Internal server error: ' + error.error);
        }
        else {
          alert('Unexpected error occurred.');
        }
      }
    })
  }
}
