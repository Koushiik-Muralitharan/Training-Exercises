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
 //http://localhost:7032/api/Activity/GetActivity?taskId=101
  GetActivity(taskId:number): Observable<Activity[]>{
    return this.http.get<Activity[]>(`${environment.ACTIVITY_API_URL}/GetActivity?taskId=${taskId}`);
  }
  GetSingleActivity(activityId:number): Observable<Activity>{
    return this.http.get<Activity>(`${environment.ACTIVITY_API_URL}/GetSingleActivity?activityId=${activityId}`);
  }
  GetAllActivity(userId:number):Observable<Activity[]>{
    return this.http.get<Activity[]>(`${environment.ACTIVITY_API_URL}/GetAllActivityByUser?userId=${userId}`);
  }

  GetCurrentTaskIdFromSession():number{
        const taskId = sessionStorage.getItem("CurrentTaskId");
        return taskId ? parseInt(JSON.parse(taskId)) : -1;
  }

  DeleteActivity(activityId: number): Observable<any>{
    return this.http.delete(`${environment.ACTIVITY_API_URL}/DeleteActivity?activityId=${activityId}`);
  }

  EditActivity(activity:Activity) : Observable<any>{
    return this.http.put(`${environment.ACTIVITY_API_URL}/`,activity);
  }
}
