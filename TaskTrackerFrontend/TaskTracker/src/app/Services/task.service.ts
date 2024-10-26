import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../Modal/Task';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Activity } from '../Modal/Activity';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  AddTask(obj: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.TASK_API_URL}/Addtask`, obj);
  }
  DeleteTask(taskId: number): Observable<any> {
    return this.http.delete(
      `${environment.TASK_API_URL}/DeleteTask?TaskId=${taskId}`
    );
  }
  GetTask(date: string, userId: number): Observable<Task> {
    return this.http.get<Task>(
      `${environment.TASK_API_URL}/GetTasksByDate?date=${date}&userId=${userId}`
    );
  }
  GetTaskEditStatusFromSession(): number {
    const editId = sessionStorage.getItem('editForTask');
    return editId ? parseInt(editId) : -1;
  }

  GetEditTask(taskId: number): Observable<Task> {
    return this.http.get<Task>(
      `${environment.TASK_API_URL}/GetEditTaskDetails?taskId=${taskId}`
    );
  }

  EditTask(task:Task): Observable<any> {
     return this.http.put(`${environment.TASK_API_URL}/EditTask`,task);
  }

  TotalTaskCount(userId: number): Observable<any>{
    return this.http.get<number>(`${environment.TASK_API_URL}/TotalTaskCount?userId=${userId}`);
  }
}
