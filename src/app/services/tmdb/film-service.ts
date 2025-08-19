import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tmdbHeaders } from 'app/core/tmdb-headers';
import { FilmDetails } from 'app/models/film-details.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  
  // ---------- Injections ----------

  private http = inject(HttpClient);

  // ---------- Properties ----------

  private url: string = '/api/film';

  // ---------- Methods ----------

  getFilmById (filmId: number): Observable<FilmDetails> {
    const url = `${this.url}/${filmId}`;
    return this.http.get<FilmDetails>(url);
  }

}
