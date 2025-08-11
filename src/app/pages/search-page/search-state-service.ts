import { Injectable, signal } from '@angular/core';

@Injectable()
export class SearchStateService {
  selectedGenres = signal<string[]>([]);

  setSelectedGenres(genre: string){
    const genres = this.selectedGenres();
    if(genres.includes(genre)){
      this.selectedGenres.set(genres.filter(g => g !== genre));
    }else{
      this.selectedGenres.set([...genres, genre]);
    }
  }

}
