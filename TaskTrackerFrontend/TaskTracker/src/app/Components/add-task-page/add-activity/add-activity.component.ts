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
import { EditActivityModel } from '../../../Modal/EditActivity';
import { ActivityInfo } from '../../../Modal/ActivityInfoModal';

@Component({
  selector: 'app-add-activity',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-activity.component.html',
  styleUrl: './add-activity.component.css'
})
export class AddActivityComponent {
  activity:Activity = new Activity();
  edit:EditActivityModel  = new EditActivityModel();
  TaskService = inject(TaskService);
  UserService = inject(UserService);
  ActivityService = inject(ActivityService);
  activityArray:Activity[] =[];
  currentTab: string = 'new-activity';  
  editMode: boolean = false;
  hour: number = 0;
  activityCount: number = 0;
  constructor(private router: Router){}
  
  switchTab(tab: string) {
    this.currentTab = tab;
  }
   ngOnInit(){
    this.GetActivityInfo();
   }
  onSaveActivity(form:NgForm){
    if(form.invalid){
      alert('Please fill out the form correctly.');
      return;
    }
    const taskId:number = this.ActivityService.GetCurrentTaskIdFromSession();
    if(taskId != -1 || this.editMode === false){
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
  
    GetActivitiesByUser(){
      this.activityArray = [];
      const user:User = this.UserService.GetLoggedUserFromSession();
      //const userId: number = user.userId;
      const taskId: number = this.ActivityService.GetCurrentTaskIdFromSession();
      this.ActivityService.GetAllActivity(taskId).subscribe({
        next: (res)=>{
          if(res){
             this.activityArray = res;
             this.GetActivityInfo();
          }
        },
        error: (error: HttpErrorResponse) => {
          if(error.status === 400){
           alert('cannot get activity');
          }
          else if (error.status === 500) {
           alert('Internal server error: ' + error.error);
         } else {
           alert('Unexpected error occurred.');
         }
        }
      })
  }

  DeleteActivity(activityId:number){
    if(confirm('Are you sure you want to delete this task?')){
      this.ActivityService.DeleteActivity(activityId).subscribe({
          next: (res:any) =>{
            alert(res.message);
            this.activityArray = this.activityArray.filter(activity => activity.activityId != activityId);
            this.GetActivityInfo();
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
      })
    }      
  }

  EditActivity(activity: Activity){
    console.log(activity.activityId);
      this.ActivityService.GetSingleActivity(activity.activityId).subscribe({
        
        next: (res) =>{
          console.log(res);
           this.LoadDataIntoForm(res);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            alert('Activity cannot be fetched.');
          } else if (error.status === 500) {
            alert('Internal server error: ' + error.error);
          } else {
            alert('Unexpected error occurred.');
          }
        }  
      })
  }

  LoadDataIntoForm(act: Activity){  
    this.currentTab = "new-activity"
    this.activity.taskId = act.taskId,
    this.activity.activityId = act.activityId,
    this.activity.title = act.title,
    this.activity.descriptionField = act.descriptionField,
    this.activity.activityHours = act.activityHours
    this.editMode = true;
  }

  UpdateActivity(form:NgForm){
    console.log("entered...");
    this.ActivityService.EditActivity(this.activity).subscribe({
       next: (res) =>{
         console.log(typeof(res));
         alert(res.message);
         this.GetActivityInfo();
       },
       error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          alert('Activity cannot be fetched.');
        } else if (error.status === 500) {
          alert('Internal server error: ' + error.error);
        } else {
          alert('Unexpected error occurred.');
        }
      }  
     })
  }

  GetActivityInfo(){
    const user:User = this.UserService.GetLoggedUserFromSession();
    const userId = user.userId;

    this.ActivityService.GetActivityInfo(userId).subscribe({
      next: (res:ActivityInfo)=>{
          this.activityCount = res.activityCount;
          this.hour = res.hour;
          console.log(res.activityCount);
          console.log(res.hour);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          alert('Activity cannot be fetched.');
        } else if (error.status === 500) {
          alert('Internal server error: ' + error.error);
        } else {
          alert('Unexpected error occurred.');
        }
      }  
    })
  }
}
