import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login/login.service';
import { User } from 'src/interfaces/user';
import { Admin } from 'src/interfaces/admin';
@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }
  message:any;
  
  currentUser:User = this.loginService.currentUser;
  currentAdmin:Admin = this.loginService.currentAdmin;

  loggedin=this.loginService.loggedin;
  get userName() {
    return this.currentUser.userName;
  }


  logout() {
    if(this.currentUser==null && this.currentAdmin!=null) {
      let resp = this.loginService.adminLogout(this.currentAdmin);
      resp.subscribe((data:any) => this.message = data);
      this.loginService.currentAdmin = null;
      this.loginService.updateAdminLoggedIn(false);
    }
    else if(this.currentUser!=null && this.currentAdmin==null) {
      let resp = this.loginService.userLogout(this.currentUser);
      resp.subscribe((data:any) => this.message = data);
      this.loginService.currentUser = null;
      this.loginService.updateUserLoggedIn(false);
    }
  }

}
