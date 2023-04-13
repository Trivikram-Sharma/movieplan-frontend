import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import userapi from 'src/api-constants/userapi';
import { User } from 'src/interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }

  signUp(user:User){
    return this.http.post(userapi.signUp,user,{responseType:'text' as 'json'})
  }
}
