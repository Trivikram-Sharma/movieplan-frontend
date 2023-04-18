import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Admin } from 'src/interfaces/admin';
import { LoginService } from 'src/services/login/login.service';
import { User } from 'src/interfaces/user';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private loginService:LoginService) { }
  message:any;
  currentUser:User = this.loginService.currentUser;
  //currentAdmin:Admin = this.loginService.currentAdmin;
  ngOnInit(): void {
  }
  loggedin:boolean = this.loginService.loggedin;

  changePasswordForm = new FormGroup(
    {
      oldpassword: new FormControl('', Validators.required),
      newpassword: new FormControl('',Validators.required),
      confirmpassword: new FormControl('',Validators.required)
    }
  );

  get oldpassword(){
    return this.changePasswordForm.get('oldpassword')
  }
  get newpassword(){
    return this.changePasswordForm.get('newpassword')
    
  }
  get confirmpassword(){
    return this.changePasswordForm.get('confirmpassword')
  }
  submit(){
    if(!this.changePasswordForm.invalid) {
      if(<String>this.oldpassword?.value == this.currentUser.password) {
        if(this.newpassword?.value == this.confirmpassword?.value){
          let changepasswordRecord = {

          };
          //Some code for password change
        }
        else {
          alert(`The new passwords are not matching!
           Please enter the same new password in 'New Password' and 'Confirm Passowrd'`)
        }
      }
      else {
        alert('Incorrect old password! Please enter your old password')
      }
    }
    else {
      alert('Something Went Wrong!')
    }
  }
}
