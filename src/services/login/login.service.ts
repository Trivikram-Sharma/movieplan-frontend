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
    return this.http.post<User>(userapi.signIn,user,{responseType:'json'})
  }

  adminLogin(admin:Admin) {
    return this.http.post<Admin>(adminapi.adminLogin,admin,{observe: 'body',responseType:'json'})
  }

  userLogout(user:User) {
    return this.http.patch(userapi.signOut + user.userName,null,{responseType:'json'});
  }

  adminLogout(admin:Admin) {
    return this.http.post<Admin>(adminapi.adminLogout,admin,{observe:'body',responseType: 'json'})
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

  getLoggedIn(){
    return this.loggedin;
  }

  updateCurrentUser(user:User){
    this.currentUser = user;
  }

  updateCurrentAdmin(admin:Admin) {
    this.currentAdmin = admin;
  }

}
