import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../Modal/User';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient){ }
  Adduser (obj:User): Observable<User>{
    return this.http.post<User>(`${environment.USER_API_URL}/CreateAccount`, obj);
  }

  GetLoggedUserInfo(userName:string, password:string){
    return this.http.get<User>(`${environment.USER_API_URL}/LoggedUserInfo?UserName=${userName}&Password=${password}`);
  }
}
