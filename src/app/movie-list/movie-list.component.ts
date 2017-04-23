import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Movie } from '../movie-model/movie.model';
import { MovieService } from '../movie-service/movie.service';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']  
})

export class MovieListComponent implements OnInit, OnChanges {

  movies: Movie[];

  @Input() listId: string;
  @Input() editId: string;

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit() {    
    this.loadMovies();
  }

  ngOnChanges(changes:any) {
      EmitterService.get(this.listId).subscribe((movies:Movie[]) => { this.loadMovies()});
  }

  loadMovies() {
        this.movieService.getMovies()
                          .subscribe(
                              movies => this.movies = movies,
                              err => {
                                  console.log(err);
                              });
  }

  editMovie(id:string) {
     this.router.navigate([`movie-detail/${id}`]);
  }

  deleteMovie(id:string, index:number) {
      this.movieService.removeMovie(id).subscribe(
                              movies => {
                                  EmitterService.get(this.listId).emit(movies);
                              }, 
                              err => {
                                  console.log(err);
                              });          
        this.movies.splice(index, 1);                                                                                                 
  }

}
