import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styles: [
  ]
})
export class CharacterDetailComponent implements OnInit {

  charId: string = '';
  charName: string = '';
  charEyeColor: string = '';
  charGenre: string = '';
  charFilms: any = [];

  dataCharacter: any = [];

  constructor(private route: ActivatedRoute, private api: ApiService){
    this.route.paramMap.subscribe(params => {
      this.charId = params.get('character_id');      
      this.getDataCharacter(this.charId);
    });
  }

  ngOnInit(): void {
  }

  getDataCharacter(character_id){
    this.api.getDataSWAPICharacterId(character_id).subscribe((data: any) => {
      console.log(data);
      this.charName = data.name;
      this.charEyeColor = data.eye_color;
      this.charGenre = data.gender;

      let tmp_elm_url;

      data.films.forEach((element: any) => {
        tmp_elm_url = element.slice(0, -1);
        tmp_elm_url = tmp_elm_url.split('/').pop();
        this.charFilms.push(tmp_elm_url);
      });
    });
  }

}
