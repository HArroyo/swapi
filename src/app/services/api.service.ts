import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  urlApi: string = 'https://swapi.dev/api/';

  constructor(private httpClient: HttpClient, private router: Router) { }

  getQuery(query: string){
    const url = `${ this.urlApi + query }`;
    return this.httpClient.get(url);
  }  

  getDataSWAPIMovies(){
    return this.getQuery('films').pipe(
      map(data => {
        return data;
      })
    );
  }

  getDataSWAPIMovieId(id){
    return this.getQuery('films/' + id).pipe(
      map(data => {
        return data;
      })
    );
  }

  getDataSWAPICharacters(page){
    return this.getQuery('people/?page=' + page).pipe(
      map(data => {
        return data;
      })
    );
  }

  getDataSWAPICharacterId(id){
    return this.getQuery('people/' + id).pipe(
      map(data => {
        return data;
      })
    );
  }

  convertirRomanos(num: number){
    var roman = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    };
    var str = '';
  
    for (var i of Object.keys(roman)) {
      var q = Math.floor(num / roman[i]);
      num -= q * roman[i];
      str += i.repeat(q);
    }
  
    return str;
  }
}
