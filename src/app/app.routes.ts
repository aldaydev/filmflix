import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { FilmPage } from './pages/film-page/film-page';
import { SearchPage } from './pages/search-page/search-page';

export const routes: Routes = [
    {path: "", component: HomePage},
    {path: "film/:id", component: FilmPage},
    {path: "search", component: SearchPage},
];
