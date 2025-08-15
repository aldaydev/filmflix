import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tmdbHeaders } from 'app/core/tmdb-headers';
import { FilmDetails } from 'app/models/film-details.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  
  // ---------- Injections ----------

  private http = inject(HttpClient);

  // ---------- Properties ----------

  private url: string = `${environment.tmdbBaseUrl}/movie/`;
  private urlQueryParams = '?language=es-ES&append_to_response=videos,similar';

  // ---------- Methods ----------

  getFilmById (filmId: number): Observable<FilmDetails> {
    const url = `${this.url}/${filmId}${this.urlQueryParams}`;
    return this.http.get<FilmDetails>(url, { headers: tmdbHeaders })
  }

}
