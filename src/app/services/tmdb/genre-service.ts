import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GenreResponse } from 'app/models/genre-list.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GenreService {

  // ---------- Injections ----------

  private http = inject(HttpClient);

  // ---------- Properties ----------

  private url: string = '/api/genres';

  // ---------- Methods ----------

  getGenresList() : Observable<GenreResponse>{
    return this.http.get<GenreResponse>(this.url);
  }

}
