import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tmdbHeaders } from 'app/core/tmdb-headers';
import { FilmListResponse } from 'app/models/popular-film.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class SearchByFiltersService {
  private http = inject(HttpClient);
  private url: string = `${environment.tmdbBaseUrl}/discover/movie?language=es-ES`;

  getFilmsByFilters(query?: string, page?: number) : Observable<FilmListResponse>{
    const currentPate = !page ? '&page=2' : `&page=${page}`
    const finalUrl = `${this.url}${query}${currentPate}`;
    console.log(finalUrl);
    return this.http.get<FilmListResponse>(finalUrl, {headers: tmdbHeaders})
  }

  // getInitialFilms(){
  //   const finalUrl = `${this.url}`;
  //   console.log(finalUrl);
  //   return this.http.get<FilmListResponse>(finalUrl, {headers: tmdbHeaders})
  // }

}
