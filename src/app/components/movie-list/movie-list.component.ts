import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login/login.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  loggedin:boolean = this.loginService.loggedin;
}
