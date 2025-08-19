import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UpcomingFilms } from 'app/models/upcoming-film.model';
import { Observable } from 'rxjs';

@Injectable()
export class UpcomingFilmsService {

  // ---------- Injections ----------

  private http = inject(HttpClient);

  // ---------- Properties ----------

  private url: string = '/api/upcoming-films';

  // ---------- Methods ----------

  getUpcomingFilms(page?: number) : Observable<UpcomingFilms> {
    const params = page ? `?page=${page}` : '';
    const finalUrl = `${this.url}${params}`;
    return this.http.get<UpcomingFilms>(finalUrl);
  }
}
