import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieType } from '../../types';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies : MovieType [] = [];
  query : string = '';
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getAll()
    .subscribe(
      data => {
        if(data && data.results && data.results.length > 0){
          this.movies = data.results.map((el:MovieType, index:number) => {
            return {...el, image:this.movieService.getImage(index)}
          });
        }
      },
      error => {
        console.log('error', error);
      }
    )
  }
}
