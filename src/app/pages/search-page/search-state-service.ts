import { Injectable, signal } from '@angular/core';

@Injectable()
export class SearchStateService {
  selectedGenres = signal<string[]>([]);

  setSelectedGenres(genresArr: string[]){
    this.selectedGenres.set(genresArr);
  }

}
