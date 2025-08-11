import { effect, inject, Injectable, OnInit, signal } from '@angular/core';
import { FilmListItem } from 'app/models/popular-film.model';
import { SearchByFiltersService } from 'app/services/tmdb/search-by-filters-service';

@Injectable()
export class SearchStateService {

  // ---------- Injections ----------

  searchByFiltersService = inject(SearchByFiltersService);

  // ---------- Properties ----------

  selectedGenreIds = signal<number[]>([]);
  queryString = signal<string>("");

  hasOptions = signal<boolean>(false);
  hasGenres = signal<boolean>(false);
  hasName = signal<boolean>(false);
  hasYear = signal<boolean>(false);

  filmList = signal<FilmListItem[]>([]);

  // ---------- Life Cycle ----------

  // ngOnInit(): void {
  //   effect(() => {
  //     this.selectedGenres();
  //     this.setQueryString();

  //     // if(!this.searchOptions() && this.selectedGenres().length > 0){
  //     //   this.searchOptions.set(true);
  //     // }else if(this.selectedGenres().length === 0){
  //     //   this.searchOptions.set(false);
  //     // }

  //     console.log(this.queryString());
  //   })
  // }

  constructor(){
    effect(() => {
      this.selectedGenreIds();
      this.setQueryString();

      // if(!this.searchOptions() && this.selectedGenres().length > 0){
      //   this.searchOptions.set(true);
      // }else if(this.selectedGenres().length === 0){
      //   this.searchOptions.set(false);
      // }

      console.log(this.queryString());
    })
  }
  
  // ---------- Methods ----------

  searchByfilters() {
    this.hasName = signal<boolean>(false);
    this.searchByFiltersService.getFilmsByFilters(this.queryString()).subscribe((data) => {
      
      this.selectedGenreIds().length > 0 ? this.hasOptions.set(true) : this.hasOptions.set(false);

      this.selectedGenreIds().length > 0 ? this.hasGenres.set(true) : this.hasGenres.set(false);
      
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

  setQueryString(){
    let query = "";

    if(this.selectedGenreIds().length > 0){
      const genresQuery = this.selectedGenreIds().reduce((acc, curr, currIndex) => {
        if(currIndex < this.selectedGenreIds().length -1){
          acc += `${curr},`;
        }else{
          acc += curr;
        }
        return acc;
      }, "with_genres=");

      query += genresQuery;
    }

    if(query){
      this.queryString.set('&' + query);
    }else{
      return;
    }
    
  }

}
