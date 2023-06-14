import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/interfaces/admin';
import { LoginService } from 'src/services/login/login.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor(private loginService:LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  loggedin:boolean = this.loginService.loggedin;
  adminLoggedIn:boolean = true;//this.loginService.currentAdmin;

  movieForm = new FormGroup({})
  toggleMovieEdit(){
    
  }
}
