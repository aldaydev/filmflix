import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tmdbHeaders } from 'app/core/tmdb-headers';
import { FilmListResponse } from 'app/models/popular-film.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SearchByNameService {

    // ---------- Injections ----------

    private http = inject(HttpClient);

    // ---------- Properties ----------

    private url: string = `${environment.tmdbBaseUrl}/search/movie?language=es-ES&include_adult=false`;

    // ---------- Methods ----------
    
    getFilmsByName(query?: string, page?: number ): Observable<FilmListResponse> {
        const currentPate = !page ? '&page=1' : `&page=${page}`;
        const finalUrl = `${this.url}${query}${currentPate}`;
        return this.http.get<FilmListResponse>(finalUrl, { headers: tmdbHeaders });
    }
}
