import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  page: string= '';
  constructor(private router: Router) { 
    router.events.subscribe(
      (data:any) => {
       if(data && data.url){
        this.page = data.url.split("/").filter((el:string) => el).pop()
       }
      },
      error => {
        console.log('error', error);
      }
    )

  }

  ngOnInit(): void {}

}
