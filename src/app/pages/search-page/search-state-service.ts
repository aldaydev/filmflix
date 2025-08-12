import { effect, inject, Injectable, OnInit, signal } from '@angular/core';
import { Genre } from 'app/models/genre-list.model';
import { FilmListItem } from 'app/models/popular-film.model';
import { GenreService } from 'app/services/tmdb/genre-service';
import { SearchByFiltersService } from 'app/services/tmdb/search-by-filters-service';

@Injectable()
export class SearchStateService {

  // ---------- Injections ----------

  searchByFiltersService = inject(SearchByFiltersService);
  genreService = inject(GenreService);

  // ---------- Properties ----------

  selectedGenreIds = signal<number[]>([]);
  selectedYear = signal("");

  hasOptions = signal<boolean>(false);
  hasGenres = signal<boolean>(false);
  hasName = signal<boolean>(false);
  hasYear = signal<boolean>(false);

  genreList = signal<Genre[]>([]);
  filmList = signal<FilmListItem[]>([]);

  // ---------- Methods ----------

  getGenreList(){
    this.genreService.getGenresList()
      .subscribe((genreList) => {
        this.genreList.set(genreList.genres);
      })
  }

  initialFilmList(){
    this.searchByFiltersService.getFilmsByFilters().subscribe(data => this.filmList.set(data.results));
  }

  searchByfilters() {
    
    const queryString = this.setQueryString();
    this.hasName = signal<boolean>(false);
    this.searchByFiltersService.getFilmsByFilters(queryString).subscribe((data) => {
      
      this.selectedGenreIds().length > 0 || this.selectedYear()
        ? this.hasOptions.set(true) 
        : this.hasOptions.set(false);

      this.selectedGenreIds().length > 0 ? this.hasGenres.set(true) : this.hasGenres.set(false);
      this.selectedYear() ? this.hasYear.set(true) : this.hasYear.set(false);
      
      this.filmList.set(data.results);
      console.log(data.results);
    })
  }

  setSelectedGenres(genreId: number){

    const genreIds = this.selectedGenreIds();

    if(genreIds.includes(genreId)){
      this.selectedGenreIds.set(genreIds.filter(g => g !== genreId));
    }else{
      this.selectedGenreIds.set([...genreIds, genreId]);
    }
  }

  setSelectedYear(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.slice(0, 4);
    this.selectedYear.set(value);
    input.value = value;
  }

  setQueryString() : string{
    let query = "";

    if(this.selectedGenreIds().length > 0){

      const genresQuery = this.selectedGenreIds().reduce((acc, curr, currIndex) => {
        currIndex < this.selectedGenreIds().length -1 ? acc += `${curr},` : acc += curr;
        return acc;
      }, "with_genres=");

      query += '&' + genresQuery;
    }

    if(this.selectedYear()){
      console.log("Desde create query", this.selectedYear());
      const yearQuery = `&primary_release_year=${this.selectedYear()}`;

      query += yearQuery;
    }

    if(query){
      return query;
    }else{
      return "";
    }
    
  }

}
