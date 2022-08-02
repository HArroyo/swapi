import { Routes } from '@angular/router';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieCharactersComponent } from './pages/movie-characters/movie-characters.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';

export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'movie/:movie_id', component: MovieDetailComponent },
    { path: 'characters', component: MovieCharactersComponent },
    { path: 'characters/:character_id', component: CharacterDetailComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];