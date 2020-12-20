import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { PeopleType } from '../../types';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  peoples : PeopleType [] = [];
  query : string = '';
  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.peopleService.getAll()
    .subscribe(
      data => {
        if(data && data.results && data.results.length > 0){
          this.peoples = data.results.map((el:PeopleType, index:number)=>{
            return {...el, image: this.peopleService.getImage(index)}
          });
        }
      },
      error => {
        console.log('error', error);
      }
    )
  }
}
