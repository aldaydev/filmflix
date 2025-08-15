import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tmdbHeaders } from 'app/core/tmdb-headers';
import { GenreResponse } from 'app/models/genre-list.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GenreService {

  // ---------- Injections ----------

  private http = inject(HttpClient);

  // ---------- Properties ----------

  private url: string = `${environment.tmdbBaseUrl}/genre/movie/list`;
  private urlQueryParams = '?language=es';

  // ---------- Methods ----------

  getGenresList() : Observable<GenreResponse>{
    const url = `${this.url}${this.urlQueryParams}`;
    return this.http.get<GenreResponse>(url, {headers: tmdbHeaders});
  }

}
