import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tmdbHeaders } from 'app/core/tmdb-headers';
import { PopularFilm, PopularFilms } from 'app/models/popular-film.model';
import { environment } from 'environments/environment';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopularFilmsService {
  private http = inject(HttpClient);
  private url: string = `${environment.tmdbBaseUrl}/movie/popular?language=es-ES&page=1`;
  popularFilms = signal<PopularFilms | null>(null);

  getPopularFilms(): Observable<PopularFilms> {
    return this.http.get<PopularFilms>(this.url, {
      headers: tmdbHeaders,
    });
  }

  async getPopularIds(): Promise<string[]> {
    const response = await firstValueFrom(this.getPopularFilms());
    return response.results.slice(0, 5).map((film: PopularFilm) => film.id.toString());
  }


}
