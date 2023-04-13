import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { RegistrationService } from 'src/services/registration/registration.service';
import { User } from 'src/interfaces/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    userpassword: new FormControl('',Validators.required)
    }
  );
  message:any;
  constructor(private registrationService:RegistrationService, private router:Router) { }

  get username(){
    return this.registerForm.get('username')
  }
  get userpassword(){
    return this.registerForm.get('userpassword')
  }
  ngOnInit(): void {
  }

  formError = false;
  verifyUniqueUserId(){
  }

  submit(){
    if(!this.registerForm.invalid) {
      let user:User = {
        userName: <String>this.username?.value,
        password: <String>this.userpassword?.value,
        status: "inactive"
      };
      let resp = this.registrationService.signUp(user);
      resp.subscribe((data:any) => this.message = data);
      if(this.message==false) {
        this.formError = true;
      }
      else {
      }
    }
    else {
      console.log("Something went wrong!",this.registerForm);
    }
  }
}
