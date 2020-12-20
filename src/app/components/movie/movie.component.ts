import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { PeopleService } from '../../services/people.service';
import { MovieType, PeopleType } from '../../types';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie: MovieType = {
    id: '',
    title: '',
    episode_id: '',
    director: '',
    producer: '',
    release_date: '',
    opening_crawl: '',
    characters: [],
    image: ''
  };
  peoples: PeopleType[] = [];
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private peopleService: PeopleService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.movieService.get(id)
        .subscribe(
          data => {
            if (data) {
              this.movie = {...data,image:this.movieService.getImage(parseInt(id))};
              if(data.characters && data.characters.length > 0){
                data.characters.splice(0,3).forEach((c:string) => {
                  var characterId = c.split('/').filter(el => el).pop();
                  if(characterId){
                    this.peopleService.get(characterId)
                    .subscribe(
                      data => {
                        this.peoples.push({...data,id: characterId});
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
