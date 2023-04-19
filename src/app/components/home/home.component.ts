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
  }
  get userName(){
    return this.loginForm.get('userName')
  }
  get password() {
    return this.loginForm.get('password')
  }
  get adminrole() {
    return this.loginForm.get('adminroleGroup')?.get('adminrole')
  }
  loggedin:boolean = this.loginService.loggedin;
  submit(){
    if(!this.loginForm.invalid){
      if(this.adminrole?.value=="No") {
        let user:User = {
          userName: <String>this.userName?.value,
          password: <String>this.password?.value,
          status:"inactive"
        };
        let resp = this.loginService.userLogin(user);
        resp.subscribe((data:any) => this.message = data);
        this.loginService.currentUser = this.message;
        if(this.loginService.currentUser!=null) {
          this.loginService.updateUserLoggedIn(true);
        }
      }
      else if(this.adminrole?.value=="Yes") {
        let adminuser:Admin = {
          adminUserName: <String>this.userName?.value,
          adminPassword: <String>this.password?.value,
          status: "inactive"
        };
        let resp = this.loginService.adminLogin(adminuser);
        resp.subscribe((data:any) => this.message = data);
        if(this.message == "Hi " + adminuser.adminUserName + "! Welcome! Your Login is Successful!"){
          this.loginService.currentAdmin = adminuser;
        console.log('message is '+this.message);
        
        }
        if(this.loginService.currentAdmin!=null) {
          this.loginService.updateAdminLoggedIn(true);
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
