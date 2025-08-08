import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Film, PopularFilms } from 'app/models/film.model';
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
      headers: {
        Authorization: `Bearer ${environment.tmdbToken}`,
      },
    });
  }

  async getPopularIds(): Promise<string[]> {
    const response = await firstValueFrom(this.getPopularFilms());
    return response.results.slice(0, 5).map((film: Film) => film.id.toString());
  }


}
