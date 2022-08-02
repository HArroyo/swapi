import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  dataMovies: any = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadMoviesSW();
  }

  loadMoviesSW(){    
    this.api.getDataSWAPIMovies().subscribe((data: any) => {
      this.dataMovies = data.results;
      let tmp_elm_url: string = '';

      this.dataMovies.forEach((element: any) => {
        tmp_elm_url = element.url.slice(0, -1);
        tmp_elm_url = tmp_elm_url.split('/').pop();
        element.url = tmp_elm_url;
      });

      console.log(this.dataMovies);
    });
  }

}
