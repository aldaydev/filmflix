import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tmdbHeaders } from 'app/core/tmdb-headers';
import { FilmListResponse } from 'app/models/popular-film.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SearchByFiltersService {

  // ---------- Injections ----------

  private http = inject(HttpClient);

  // ---------- Properties ----------

  private url: string = '/api/search-films';

  // ---------- Methods ----------

  getFilmsByFilters({query, page, sort} : {query?: string, page?: number, sort?: {by: string, order: string}
    }
  ) : Observable<FilmListResponse>{

    const sortBy = sort ? `&sort_by=${sort.by}.${sort.order}` : "";
    const currentPage = !page ? 'page=1' : `page=${page}`;
    const currentQuery = query ? query : '';
    const finalUrl = `${this.url}?${currentPage}${sortBy}${currentQuery}`;

    return this.http.get<FilmListResponse>(finalUrl);
  }

  // getFilmsByFilters({query, page, sort} : {query?: string, page?: number, sort?: {by: string, order: string}
  //   }
  // ) : Observable<FilmListResponse>{
  //   const sortBy = sort ? `&sort_by=${sort.by}.${sort.order}` : "";
  //   const currentPage = !page ? '&page=1' : `&page=${page}`;
  //   const finalUrl = `${this.url}${query}${currentPage}${sortBy}`;
  //   return this.http.get<FilmListResponse>(finalUrl);
  // }

}
