import { Injectable } from '@angular/core';
import { Activity } from '../Modal/Activity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private  http:HttpClient) { }
  AddActivity(obj:Activity): Observable<Activity>{
    return this.http.post<Activity>(`${environment.ACTIVITY_API_URL}/AddActivity`,obj)
  }

  GetCurrentTaskIdFromSession():number{
        const taskId = sessionStorage.getItem("CurrentTaskId");
        return taskId ? parseInt(JSON.parse(taskId)) : -1;
  }
}
