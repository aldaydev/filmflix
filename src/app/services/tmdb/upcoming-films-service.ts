import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tmdbHeaders } from 'app/core/tmdb-headers';
import { UpcomingFilms } from 'app/models/upcoming-film.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class UpcomingFilmsService {
  private http = inject(HttpClient);
  private url: string = `${environment}/movie/upcoming`;

  getUpcomingFilms() : Observable<UpcomingFilms> {
    return this.http.get<UpcomingFilms>(this.url, {headers: tmdbHeaders});
  }
}
