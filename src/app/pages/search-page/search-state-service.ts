import { effect, Injectable, signal } from '@angular/core';

@Injectable()
export class SearchStateService {

  // ---------- Life Cycle ----------

  constructor() {
    effect(() => {
      this.selectedGenres();
      this.setQueryString();

      if(!this.searchOptions() && this.selectedGenres().length > 0){
        this.searchOptions.set(true);
      }else if(this.selectedGenres().length === 0){
        this.searchOptions.set(false);
      }

      console.log(this.queryString());
    })
  }

  // ---------- Properties ----------

  selectedGenres = signal<number[]>([]);
  queryString = signal<string>("");
  hasOptions = signal<'name' | 'filters' | null>(null);
  searchOptions = signal<boolean>(false);
  
  // ---------- Methods ----------

  setSelectedGenres(genreId: number){
    const genres = this.selectedGenres();
    if(genres.includes(genreId)){
      this.selectedGenres.set(genres.filter(g => g !== genreId));
    }else{
      this.selectedGenres.set([...genres, genreId]);
    }
  }

  setQueryString(){
    let query = "";

    if(this.selectedGenres().length > 0){
      const genresQuery = this.selectedGenres().reduce((acc, curr, currIndex) => {
        if(currIndex < this.selectedGenres().length -1){
          acc += `${curr},`;
        }else{
          acc += curr;
        }
        return acc;
      }, "with_genres=");

      query += genresQuery;
    }

    this.queryString.set('?' + query);
  }

}
