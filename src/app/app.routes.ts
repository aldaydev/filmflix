import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { FilmPage } from './pages/film-page/film-page';
import { SearchPage } from './pages/search-page/search-page';
import { UpcomingPage } from './pages/upcoming-page/upcoming-page';
import { NowPlayingPage } from './pages/now-playing-page/now-playing-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';

export const routes: Routes = [
    {path: "", component: HomePage},
    {path: "film/:id", component: FilmPage},
    {path: "search", component: SearchPage},
    {path: "upcoming", component: UpcomingPage},
    {path: "now-playing", component: NowPlayingPage},
    {path: "**", component: NotFoundPage},
];
