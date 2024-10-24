import { Component, inject } from '@angular/core';
import { TaskService } from '../../../Services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../Services/user.service';
import { User } from '../../../Modal/User';
import { Task } from '../../../Modal/Task';
import { Router } from '@angular/router';
import { Activity } from '../../../Modal/Activity';
import { ActivityService } from '../../../Services/activity.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-activity',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-activity.component.html',
  styleUrl: './add-activity.component.css'
})
export class AddActivityComponent {
  constructor(private router: Router){}
  activity:Activity = new Activity();
  TaskService = inject(TaskService);
  UserService = inject(UserService);
  ActivityService = inject(ActivityService);

  onSaveActivity(form:NgForm){
    if(form.invalid){
      alert('Please fill out the form correctly.');
      return;
    }
    const taskId:number = this.ActivityService.GetCurrentTaskIdFromSession();
    if(taskId != -1){
      this.activity.taskId = taskId;
      this.ActivityService.AddActivity(this.activity).subscribe({
           next: (res: any) => {
            if (res) {
              form.reset();
              alert("Activity added successfully");
            }
           },
           error: (error: HttpErrorResponse) => {
             if(error.status === 400){
              alert('cannot add activity');
             }
             else if (error.status === 500) {
              alert('Internal server error: ' + error.error);
            } else {
              alert('Unexpected error occurred.');
            }
           }
      })
    }else{
      alert('Add a task to add activity');
    }
  }
}
