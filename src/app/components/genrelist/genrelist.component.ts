import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/interfaces/admin';
import { Genre } from 'src/interfaces/genre';
import { GenreService } from 'src/services/genre/genre.service';
import { LoginService } from 'src/services/login/login.service';

@Component({
  selector: 'app-genrelist',
  templateUrl: './genrelist.component.html',
  styleUrls: ['./genrelist.component.css']
})
export class GenrelistComponent implements OnInit {

  constructor(private genreService: GenreService, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  message:any;
  adminLoggedIn: Admin = this.loginService.currentAdmin;
  loggedin:boolean = this.loginService.getLoggedIn();
  genredeleted:boolean = false;
  show:string = "";
  allGenres(){
    this.genreService.getAllGenres()
    .subscribe(
      (data:Genre[]) => this.message = data
    );
    return this.message;
  }
  genreList:Genre[] = <Genre[]>this.allGenres();

  deleteGenre(genre:Genre){
    let confirmed:boolean = confirm(`Are you sure you want to delete genre with name ${genre.name}?`);
    if(confirmed){ 
    this.genreService.deleteGenre(genre)
    .subscribe( (data:boolean) => this.genredeleted = data);
    }
    if(this.genredeleted) {
      setTimeout(() =>{
        this.message = `Genre ${genre.name} deleted successfully!`;
        this.show = "show";
      },50000);
      alert(`Genre with name ${genre.name} deleted successfully!`);
    }
  }
  
}
