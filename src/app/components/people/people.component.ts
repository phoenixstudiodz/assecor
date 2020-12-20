import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { PeopleService } from '../../services/people.service';
import { MovieType, PeopleType } from '../../types';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  people: PeopleType = {
    id: '',
    name: '',
    height: 0,
    mass: 0,
    hair_color: '',
    skin_color: '',
    eye_color: '',
    birth_year: '',
    gender: '',
    films: [],
    image: ''
  };
  movies: MovieType[] = [];
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private peopleService: PeopleService, private movieService: MovieService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.peopleService.get(id)
        .subscribe(
          data => {
            if (data) {
              this.people = {...data, image: this.peopleService.getImage(parseInt(id))};
              if(data.films && data.films.length > 0){
                data.films.splice(0,3).forEach((c:string) => {
                  var filmId = c.split('/').filter(el => el).pop();
                  if(filmId){
                    this.movieService.get(filmId)
                    .subscribe(
                      data => {
                        this.movies.push({...data,id: filmId});
                      },
                      error => {
                        console.log("error", error);
                      }
                      
                    )
                  }
                  
                });
              }
            }
            this.loading = false;
          },
          error => {
            console.log('error', error);
            this.loading = false;
          }
        )
    }
  }

}
