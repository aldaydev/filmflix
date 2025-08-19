import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FilmListResponse } from 'app/models/popular-film.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SearchByNameService {

    // ---------- Injections ----------

    private http = inject(HttpClient);

    // ---------- Properties ----------

    private url: string = '/api/search-films-by-name';

    // ---------- Methods ----------
    
    getFilmsByName(query?: string, page?: number ): Observable<FilmListResponse> {
        const currentPage = !page ? 'page=1' : `page=${page}`;
        const finalUrl = `${this.url}?${currentPage}${query}`;

        return this.http.get<FilmListResponse>(finalUrl);
    }
}
