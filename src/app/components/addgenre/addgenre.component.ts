import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Genre } from 'src/interfaces/genre';
import { GenreService } from 'src/services/genre/genre.service';
import { LoginService } from 'src/services/login/login.service';
import { Admin } from 'src/interfaces/admin';
import { ToastService } from 'src/services/toast/toast.service';
@Component({
  selector: 'app-addgenre',
  templateUrl: './addgenre.component.html',
  styleUrls: ['./addgenre.component.css']
})
export class AddgenreComponent implements OnInit {

  constructor(private genreService: GenreService, 
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastService) { }

  ngOnInit(): void {
  }
  message:any;
  show:string = '';
  adminLoggedIn: Admin = this.loginService.currentAdmin;
  genreResponse:boolean = false;
  addGenreForm = new FormGroup({
    name: new FormControl('')
  });

  addGenre(){
    let genre:Genre = {
      name: <string>this.addGenreForm.get('name')?.value
    };
    this.genreService.addGenre(genre)
    .subscribe ( (data:boolean) => this.genreResponse = data );
    console.log('Genre Response',this.genreResponse);
    if(this.genreResponse){
      this.message = `Genre -> ${this.addGenreForm.get('name')?.value} added successfully!!`;
      this.show = "show";
      setTimeout(() => { 
      this.toastService.setMessage(this.message);
      this.toastService.setShow(this.show);
      this.router.navigate(['/servicesList/genreList'])
      }
      ,5000);
      this.toastService.setShow("");
    }else {
      console.log('SOmething went wrong!');
      return;
    }
  }


}
