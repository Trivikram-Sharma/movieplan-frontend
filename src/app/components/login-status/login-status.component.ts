import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login/login.service';
import { User } from 'src/interfaces/user';
import { Admin } from 'src/interfaces/admin';
import { ThisReceiver } from '@angular/compiler';
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
  get loggedin(){
    return this.loginService.loggedin;
   }
  
  get currentUser()  {return this.loginService.currentUser};
  get currentAdmin() {return this.loginService.currentAdmin} ;

  get userloggedin() { return this.loginService.userLoggedIn};
  get adminLoggedin() {return this.loginService.adminLoggedIn};
  get userName() {
   return this.currentUser.userName;
  }
  get adminUserName() {
    return this.currentAdmin.adminUserName;
  }


  logout() {
    if(this.currentUser==null && this.currentAdmin!=null) {
      this.loginService.adminLogout(this.currentAdmin)
      .subscribe((data:any) => this.message = data);
      this.loginService.currentAdmin = null;
      this.loginService.updateAdminLoggedIn(false);
      this.loginService.updateLoggedIn(false);
    }
    else if(this.currentUser!=null && this.currentAdmin==null) {
      this.loginService.userLogout(this.currentUser)
      .subscribe((data:any) => {//this.message = data;
            console.log(data);
      });
      if(this.message){
      this.loginService.currentUser = null;
      this.loginService.updateUserLoggedIn(false);
      this.loginService.updateLoggedIn(false);
    }
    }
  }

}
