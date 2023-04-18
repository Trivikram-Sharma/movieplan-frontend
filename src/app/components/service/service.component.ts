import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login/login.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }
  loggedin:boolean = this.loginService.loggedin;
}
