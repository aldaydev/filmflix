import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tmdbHeaders } from 'app/core/tmdb-headers';
import { UpcomingFilms } from 'app/models/upcoming-film.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class UpcomingFilmsService {

  // ---------- Injections ----------

  private http = inject(HttpClient);

  // ---------- Properties ----------

  private url: string = `${environment.tmdbBaseUrl}/movie/upcoming?language=es-ES`;

  // ---------- Methods ----------

  getUpcomingFilms(page?: number) : Observable<UpcomingFilms> {
    const pageQuery = page !== undefined ? `&page=${page}` : "";
    const finalUrl = `${this.url}${pageQuery}`
    return this.http.get<UpcomingFilms>(finalUrl, {headers: tmdbHeaders});
  }
}
