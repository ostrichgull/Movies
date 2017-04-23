import { Component, EventEmitter, Input, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm }    from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { Movie } from '../movie-model/movie.model';
import { MovieService } from '../movie-service/movie.service';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})

export class MovieDetailComponent implements OnInit, OnChanges {

  private movie = this.getCleanMovie();
  private editing = false;
  
  @Input() editId: string;
  @Input() listId: string;

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.editId = this.route.snapshot.params['id'];

    if (this.editId != '0')
      this.loadMovie();          
  }

  ngOnChanges() {

        EmitterService.get(this.editId).subscribe((movie:Movie) => {
            this.movie = movie;
            this.editing = true;
        });

  }

  getCleanMovie() : Movie { 

    this.editing = false;
    return new Movie(0, '', '', '', '', 0);
    
  }

  loadMovie(){

    this.movieService.getMovie(this.editId)
                      .subscribe(
                          movie => this.movie = movie,
                          err => {
                              console.log(err);
                          });

    this.editing = true;

  }

  submitMovie(){
      
      let movieOperation:Observable<Movie[]>;

      if(!this.editing){
        movieOperation = this.movieService.addMovie(this.movie);
      } else {
        movieOperation = this.movieService.updateMovie(this.movie)
      }

      movieOperation.subscribe(
                          movies => {
                              EmitterService.get(this.listId).emit(movies);
                              this.movie = this.getCleanMovie();
                              if(this.editing) this.editing = !this.editing;
                          }, 
                          err => {
                              console.log(err);
                          });   
  }

}
