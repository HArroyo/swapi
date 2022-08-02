import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-movie-characters',
  templateUrl: './movie-characters.component.html',
  styles: [
  ]
})
export class MovieCharactersComponent implements OnInit {
  dataCharacters: any = [];
  dataTotal: number = 0;
  pageActual: number = 1;
  totNumPages: number = 0;

  filterFilm: string = '';
  filterGender: string = '';
  filterEyeColor: string = '';

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(params => {
      if(params.get('film')){
        this.filterFilm = params.get('film');
      }

      if(params.get('gender')){
        this.filterGender = params.get('gender');
      }

      if(params.get('eyecolor')){
        this.filterEyeColor = params.get('eyecolor');
      }
    });
  }

  ngOnInit(): void {
    this.getDataCharacters(this.pageActual);
  }

  getDataCharacters(page){
    this.dataCharacters = [];
    this.api.getDataSWAPICharacters(page).subscribe((data: any) => {
      console.log('Original', data);
      let tmpDataChar = data.results;
      this.dataTotal = data.count;

      this.totNumPages = Math.ceil(this.dataTotal / 10);

      if(this.filterFilm != '' || this.filterGender != '' || this.filterEyeColor != ''){        
        tmpDataChar.forEach((element) => {
          let found: any = false;

          element.films.forEach(movie => {
            if(movie == 'https://swapi.dev/api/films/' + this.filterFilm + '/'){
              found = true;
            }
          });          

          if(found == true){
            let tmp_elm_movie_url: string = '';
            let tmp_elm_movie_obj_ids: any = [];

            element.films.forEach((elm) => {
              tmp_elm_movie_url = elm.slice(0, -1);
              tmp_elm_movie_url = tmp_elm_movie_url.split('/').pop();
              tmp_elm_movie_obj_ids.push(tmp_elm_movie_url);
            });

            this.dataCharacters.push({
              name: element.name,
              eye_color: element.eye_color,
              gender: element.gender,
              films: tmp_elm_movie_obj_ids,
              char_id: (element.url.slice(0, -1)).split('/').pop(),
            });
          }
        });

        console.log('Arriba Pre', this.dataCharacters);

        let query: any = {};

        if(this.filterGender != ''){
          query.gender = this.filterGender.toLowerCase();
        }

        if(this.filterEyeColor != ''){
          query.eye_color = this.filterEyeColor.toLowerCase();
        }

        console.log('Query', query);

        this.dataCharacters = this.dataCharacters.filter(this.applyFilterCharacters, query);

        console.log('Arriba Post', this.dataCharacters);
      }else{
        tmpDataChar.forEach((element) => {
          let tmp_elm_movie_url: string = '';
          let tmp_elm_movie_obj_ids: any = [];

          element.films.forEach((elm) => {
            tmp_elm_movie_url = elm.slice(0, -1);
            tmp_elm_movie_url = tmp_elm_movie_url.split('/').pop();
            tmp_elm_movie_obj_ids.push(tmp_elm_movie_url);
          });

          this.dataCharacters.push({
            name: element.name,
            eye_color: element.eye_color,
            gender: element.gender,
            films: tmp_elm_movie_obj_ids,
            char_id: (element.url.slice(0, -1)).split('/').pop(),
          });
        });

        console.log('Abajo', this.dataCharacters);
      }
    });

    setTimeout(() => {
      let swapiPager = document.getElementById('swapi-paginator');
      let allPageBtn = swapiPager.querySelectorAll('.page-item');
      let actualPageBtn = swapiPager.querySelectorAll('.page-' + page)[0] as HTMLLIElement;

      allPageBtn.forEach(element => {
        element.classList.remove('active');      
      });

      actualPageBtn.classList.add('active');
    }, 800);
  }

  previousPage(){
    if(this.pageActual > 1){
      this.pageActual--;
      this.getDataCharacters(this.pageActual);
    }    
  }

  nextPage(){
    if(this.pageActual < this.dataTotal){
      this.pageActual++;
      this.getDataCharacters(this.pageActual);
    }
  }

  changePage(num){
    this.pageActual = num;
    this.getDataCharacters(this.pageActual);
  }

  createRange(num){
    return new Array(num);
  }

  filterMovieAction(){
    this.getDataCharacters(this.pageActual);
  }

  applyFilterCharacters(character){
    return Object.keys(this).every((key) => character[key] === this[key]);
  }

}
