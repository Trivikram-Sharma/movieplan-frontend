import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import adminapi from 'src/api-constants/adminapi';
import userapi from 'src/api-constants/userapi';
import { Admin } from 'src/interfaces/admin';
import { User } from 'src/interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  currentUser:any;
  currentAdmin:any;
  
  constructor(private http:HttpClient) {
    this.currentUser = null;
    this.currentAdmin = null;
   }

  userLoggedIn:boolean = false;
  adminLoggedIn:boolean = false;
  loggedin:boolean = this.userLoggedIn || this.adminLoggedIn;
  userLogin(user:User) {
    return this.http.post(userapi.signIn,user,{responseType:'text' as 'json'})
  }

  adminLogin(admin:Admin) {
    return this.http.post(adminapi.adminLogin,admin,{responseType:'text'})
  }

  userLogout(user:User) {
    return this.http.post(userapi.signOut,user,{responseType:'text' as 'json'})
  }

  adminLogout(admin:Admin) {
    return this.http.post(adminapi.adminLogout,admin,{responseType: 'text'})
  }

  updateLoggedIn(status:boolean){
    this.loggedin = status;
  }

  updateUserLoggedIn(status:boolean) {
    this.userLoggedIn = status;
  }

  
  updateAdminLoggedIn(status:boolean) {
    this.adminLoggedIn = status;
  }
}
