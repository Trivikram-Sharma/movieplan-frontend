import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/interfaces/admin';
import { Genre } from 'src/interfaces/genre';
import { GenreService } from 'src/services/genre/genre.service';
import { LoginService } from 'src/services/login/login.service';
import { ToastService } from 'src/services/toast/toast.service';

@Component({
  selector: 'app-genrelist',
  templateUrl: './genrelist.component.html',
  styleUrls: ['./genrelist.component.css']
})
export class GenrelistComponent implements OnInit {
  genreList:Genre[] = [];
  constructor(private genreService: GenreService,
     private loginService: LoginService,
     private toastService: ToastService,
     private router: Router,
     private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.forEach(
      data => this.genreList = data['genrelist']
    );
  }

  message:any;
  adminLoggedIn: Admin = this.loginService.currentAdmin;
  loggedin:boolean = this.loginService.getLoggedIn();
  genredeleted:boolean = false;
  show:string = "";
  // allGenres(){
  //   this.genreService.getAllGenres()
  //   .subscribe(
  //     (data:Genre[]) => this.message = data
  //   );
  //   return this.message;
  // }
  

  deleteGenre(genre:Genre){
    let confirmed:boolean = confirm(`Are you sure you want to delete genre with name ${genre.name}?`);
    if(confirmed){ 
    this.genreService.deleteGenre(genre)
    .subscribe( (data:boolean) => this.genredeleted = data);
    }
    if(this.genredeleted) {
      this.message = `Genre ${genre.name} deleted successfully!`;
      this.show = "show";
      setTimeout(() =>{
        this.toastService.setMessage(this.message);
        this.toastService.setShow(this.show);
      },5000);
      this.toastService.setShow("");
      alert(`Genre with name ${genre.name} deleted successfully!`);
      this.router.navigate(['/servicesList/genreList']);
    }
  }
  
}
