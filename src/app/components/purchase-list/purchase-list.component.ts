import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login/login.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }
  loggedin:boolean = this.loginService.loggedin;

}
