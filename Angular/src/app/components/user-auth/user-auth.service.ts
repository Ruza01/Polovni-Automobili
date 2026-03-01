import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from 'src/app/models/user.model';
import { signupDto } from 'src/app/Dto/signup.dto';
import { Observable } from 'rxjs';
import { responseToken } from 'src/app/models/response-token.model';

const api = "http://localhost:3000/"

@Injectable({
  providedIn: 'root'
})

export class UserAuthService {
  currentUser: any;

  constructor(private http:HttpClient){
  }

  login(email:string, password:string){
    let obj = {
      username: email,
      password: password
    }
    return this.http.post<responseToken>(`${api}auth/login`, obj);
  }

  getUserWithToken(token: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    const requestOptions = { headers: headers };
    return this.http.get<User>(`${api}auth/user`, requestOptions);
  }
  
  signupUser(signupDto: signupDto){
    return this.http.post<User>(`${api}user/register`, signupDto);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${api}/user`);
  }

  

  
}

