import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styles: [
  ]
})
export class MovieDetailComponent implements OnInit {

  movieId: string = '';
  dataMovie: any = [];

  movieTitle: string = '';
  movieEpisode: string = '';
  movieCrawlText: string = '';
  movieDirector: string = '';

  constructor(private route: ActivatedRoute, private api: ApiService){
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('movie_id');      
      this.getDataMovie(this.movieId);
    });
  }

  ngOnInit(): void {
    const sound = document.getElementById("hidden_audio") as HTMLAudioElement;
    sound.muted = false;    
  }

  getDataMovie(id){
    this.api.getDataSWAPIMovieId(id).subscribe((data: any) => {
      this.dataMovie = data;

      this.movieTitle = this.dataMovie.title;
      this.movieEpisode = this.api.convertirRomanos(Number(this.dataMovie.episode_id));
      this.movieCrawlText = this.dataMovie.opening_crawl;
      this.movieDirector = this.dataMovie.director;
      console.log(this.dataMovie);
    });
  }
}
