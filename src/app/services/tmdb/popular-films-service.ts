import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tmdbHeaders } from 'app/core/tmdb-headers';
import { FilmListItem, FilmListResponse } from 'app/models/popular-film.model';
import { environment } from 'environments/environment';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopularFilmsService {

  // ---------- Injections ----------

  private http = inject(HttpClient);

  // ---------- Properties ----------

  private url: string = '/api/popular-films';
  popularFilms = signal<FilmListResponse | null>(null);

  // ---------- Methods ----------

  getPopularFilms(): Observable<FilmListResponse> {
    return this.http.get<FilmListResponse>(this.url);
  }

  async getPopularIds(): Promise<string[]> {
    const response = await firstValueFrom(this.getPopularFilms());
    return response.results.slice(0, 5).map((film: FilmListItem) => film.id.toString());
  }


}
