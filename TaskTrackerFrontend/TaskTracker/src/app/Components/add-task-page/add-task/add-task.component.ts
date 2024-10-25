import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskService } from '../../../Services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../Services/user.service';
import { User } from '../../../Modal/User';
import { Task } from '../../../Modal/Task';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  providers:[DatePipe]
})
export class AddTaskComponent {
    
  constructor(private router: Router, private d:DatePipe){

  }
  task:Task = new Task();
  user:User = new User();
  editTask:Task = new Task();
  TaskService = inject(TaskService);
  UserService = inject(UserService);
  ngOnInit(){
    const editTaskId = this.TaskService.GetTaskEditStatusFromSession();
    if(editTaskId !== -1){
      this.TaskService.GetEditTask(editTaskId).subscribe({
        next: (res) =>{
          this.editTask = res;
          const dateString = this.editTask.taskDate;
          const [datePart, timePart] = dateString.split(' ');
          const [day, month, year] = datePart.split('-');
          const date = new Date(`${year}-${month}-${day}T${timePart}`);
          this.task.assignedBy = this.editTask.assignedBy;
          this.task.assignedTo = this.editTask.assignedTo;
          this.task.clientName = this.editTask.clientName;
          this.task.descriptionField = this.editTask.descriptionField;
          this.task.eta = this.editTask.eta;
          this.task.priorityType = this.editTask.priorityType;
          this.task.supportType = this.editTask.supportType;
          this.task.taskDate = this.d.transform(date,"yyyy-MM-dd")||"";
          this.task.title = this.editTask.title;
          this.task.projectName = this.editTask.projectName;
          console.log(this.editTask.taskDate)
        }
      })
    }
  }

  onSaveTask(form:NgForm){
    if(form.invalid){
      alert('Please fill out the form correctly.');
      return;
    }
    const editTaskId = this.TaskService.GetTaskEditStatusFromSession();
    //if(editTaskId === -1){
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
    //}
  }
}
