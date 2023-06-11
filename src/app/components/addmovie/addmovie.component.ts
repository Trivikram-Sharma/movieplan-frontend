import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { GenreService } from 'src/services/genre/genre.service';
import { Genre } from 'src/interfaces/genre';
@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {

  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
  }

  addMovieForm = new FormGroup({
    id : new FormControl({value:'', disabled: true}),
    title: new FormControl(''),
    price: new FormControl(''),
    language: new FormControl(''),
    description: new FormControl(''),
    releaseDate: new FormControl(''),
    status: new FormControl(''),
    genres: new FormArray([])
  })

  message:any;

  get genreControls(){
    return (<FormArray>this.addMovieForm.get('genres')).controls;
  }
  allGenres(){
    this.genreService.getAllGenres()
    .subscribe( (data:Genre[]) => this.message = data);
    return this.message;
  }

  addGenre(){
    (<FormArray>this.addMovieForm.get('genres')).push(new FormControl(''));
  }

  removeGenre(i:number){
    (<FormArray>this.addMovieForm.get('genres')).removeAt(i);
  }

}
