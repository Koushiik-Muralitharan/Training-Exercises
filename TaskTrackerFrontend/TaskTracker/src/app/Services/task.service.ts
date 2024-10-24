import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../Modal/Task';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Activity } from '../Modal/Activity';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  AddTask(obj:Task): Observable<Task>{
    return this.http.post<Task>(`${environment.TASK_API_URL}/Addtask`,obj);
  }
  
}
