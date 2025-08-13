import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tmdbHeaders } from 'app/core/tmdb-headers';
import { Genre } from 'app/models/film-details.model';
import { GenreResponse } from 'app/models/genre-list.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GenreService {
  private http = inject(HttpClient);
  private url: string = `${environment.tmdbBaseUrl}/genre/movie/list`;
  private urlQueryParams = '?language=es';

  getGenresList() : Observable<GenreResponse>{
    const url = `${this.url}${this.urlQueryParams}`;
    return this.http.get<GenreResponse>(url, {headers: tmdbHeaders});
  }

}
