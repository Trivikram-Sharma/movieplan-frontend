import { Component, OnInit } from '@angular/core';
import { Search } from 'src/interfaces/search';
import { LoginService } from 'src/services/login/login.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  searches:Search[] = [];
  constructor(private loginService: LoginService,
    private activatedRoute: ActivatedRoute) { }
  userLoggedIn:boolean = this.loginService.userLoggedIn;
  ngOnInit(): void {
    this.activatedRoute.data.forEach(
      data => {
        this.searches = data['data']
      }
    );
  }




}
