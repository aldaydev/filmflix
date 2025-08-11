import { effect, Injectable, signal } from '@angular/core';

@Injectable()
export class SearchStateService {
  selectedGenres = signal<number[]>([]);

  queryString = signal<string>("");

  constructor() {
    effect(() => {
      const genres = this.selectedGenres();
      const query = this.queryString();

      console.log(query);

      this.setQueryString();
    })
  }

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
