import { Injectable } from '@angular/core';
import { userdetails } from '../models/Usermodel';
import { UserStorageService } from '../Storage/user-storage.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewUserdetails } from '../models/NewUserModel';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:7197/api';

  constructor(
    private userStorage: UserStorageService,
    private router: Router,
    private http: HttpClient
  ) {}

  //http://localhost:7197/api/User/LoggedUser?email=vaibhaav&password=12345
  getLoggedUser(email: string, password: string): Observable<userdetails> {
    return this.http
      .get<userdetails>(`${this.apiUrl}/User/LoggedUser?email=${email}&password=${password}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching logged user', error);
          return throwError(error);
        })
      );
  }

  //http://localhost:7197/api/User/GetUpdatedUserInfo?userId=1012
  getUpdatedUserInfo(userId: number): Observable<userdetails> {
    return this.http
      .get<userdetails>(`${this.apiUrl}/User/GetUpdatedUserInfo?userId=${userId}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching logged user', error);
          return throwError(error);
        })
      );
  }

  // LoginUserExists(form: NgForm): Boolean {
  //   const usersArray: userdetails[] = this.userStorage.getUser();
  //   const { loginemail, loginpassword } = form.value;
  //   return usersArray.some(
  //     (user) => user.email === loginemail && user.password === loginpassword
  //   );
  // }

  EmailExists(userEmail: string): Observable<any> {
    return this.http
    .get(`${this.apiUrl}/User/CheckUserExists?userEmail=${userEmail}`)
    .pipe(
      catchError((error) => {
        console.error('Error checking user email', error);
        return throwError(error);
      })
    );  }

  addUser(form: NgForm): void {
    const { username, userphno, useremail, userpassword } = form.value;
  
  // First, check if the user exists using the API
  this.EmailExists(useremail).subscribe({
    next: (response) => {
      // If the user does not exist
      if (response.message === "no such user exists") {
        // Proceed to add the user
        this.addUserToAPI(username, useremail, userphno, userpassword).subscribe({
          next: (addUserResponse) => {
            alert(addUserResponse.message);
            this.router.navigate(['/']);  // Redirect after successful user creation
          },
          error: (error) => {
            alert('Error occurred while adding the user');
            console.error(error);
          },
        });
      } else {
        // User already exists
        alert('User with this email already exists.');
      }
    },
    error: (error) => {
      if (error.status === 409) {
        // Conflict: User already exists
        alert('User with this email already exists.');
      } else {
        alert('Error occurred while checking the user existence');
        console.error(error);
      }
    },
  });
  }

  addUserToAPI(name: string, email: string, phone: string, password: string): Observable<any> {
    const body = {
      name: name,
      email: email,
      phone: phone,
      password: password,
    };
    
    return this.http.post(`${this.apiUrl}/User/CreateUserAccount?name=${name}&email=${email}&phone=${phone}&password=${password}`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).pipe(
      catchError((error) => {
        console.error('Error adding user', error);
        return throwError(error);
      })
    );
  }
}
