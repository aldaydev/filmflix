import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { FilmPage } from './pages/film-page/film-page';

export const routes: Routes = [
    {path: "", component: HomePage},
    {path: "film/:id", component: FilmPage},
];
