import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { Admin } from 'src/interfaces/admin';
import { User } from 'src/interfaces/user';
import { LoginService } from 'src/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService:LoginService) { }
  isAdmin=['Yes','No'];
  loginError=false;
  message:any=null;
  tempArray:Admin[] = [];
  
  loggedin:boolean=false;
  currentUser = this.loginService.currentUser;
  currentAdmin = this.loginService.currentAdmin;
  //Form Initialization
  loginForm = new FormGroup({
    userName: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    adminroleGroup: new FormGroup(
      {
        adminrole: new FormControl('No',Validators.required)
      }
    )
  });
  
  ngOnInit(): void {
    this.loggedin  = this.loginService.getLoggedIn();
  }

  //GETTERS
  get userName(){
    return this.loginForm.get('userName')
  }
  get password() {
    return this.loginForm.get('password')
  }
  get adminrole() {
    return this.loginForm.get('adminroleGroup')?.get('adminrole')
  }
 
  //SUBMIT METHOD
  submit(){
    if(!this.loginForm.invalid){
      if(this.adminrole?.value=="No") {
        let user:User = {
          userName: <String>this.userName?.value,
          password: <String>this.password?.value,
          status:"inactive"
        };
        this.loginService.userLogin(user).subscribe(
          (data) => this.currentUser = data);
        if(this.currentUser!=null) {
          this.loginService.updateUserLoggedIn(true);
          this.loginService.updateCurrentUser(this.currentUser);
          this.loginService.updateLoggedIn(true);
          this.loggedin = this.loginService.getLoggedIn();
        }
      }
      else if(this.adminrole?.value=="Yes") {
        let adminuser:Admin = {
          adminUserName: <String>this.userName?.value,
          adminPassword: <String>this.password?.value,
          status: "inactive"
        };
        this.loginService.adminLogin(adminuser).subscribe(
          data => {
            this.currentAdmin = { adminUserName : data.adminUserName,
                                  adminPassword : data.adminPassword,
                                  status : data.status};
            //console.log(data);
          });
        // console.log('Current Admin ->',this.currentAdmin);
        // console.log('tempArray->',this.tempArray);
        if(this.currentAdmin!=null) {
          this.loginService.updateAdminLoggedIn(true);
          this.loginService.updateCurrentAdmin(this.currentAdmin);
          this.loginService.updateLoggedIn(true);
          this.loggedin = this.loginService.getLoggedIn();
          //console.log('this.loggedin ->',this.loggedin);
        }
      }
      else {
        alert("Something went wrong")
      }
    }
    else {
      this.loginError = true;
    }
  }
}
