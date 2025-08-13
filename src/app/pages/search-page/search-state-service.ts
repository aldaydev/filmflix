import { effect, inject, Injectable, OnInit, signal } from '@angular/core';
import { Genre } from 'app/models/genre-list.model';
import { FilmListItem } from 'app/models/popular-film.model';
import { GenreService } from 'app/services/tmdb/genre-service';
import { SearchByFiltersService } from 'app/services/tmdb/search-by-filters-service';
import { SearchByNameService } from 'app/services/tmdb/search-by-name-service';

@Injectable()
export class SearchStateService {
  // ---------- Injections ----------

  searchByFiltersService = inject(SearchByFiltersService);
  genreService = inject(GenreService);
  searchByNameService = inject(SearchByNameService);

  // ---------- Properties ----------

  page = signal<number>(1);

  selectedGenreIds = signal<number[]>([]);
  selectedYear = signal<string>('');
  selectedName = signal<string>('');

  hasOptions = signal<boolean>(false);
  hasGenres = signal<boolean>(false);
  hasName = signal<boolean>(false);
  hasYear = signal<boolean>(false);

  genreList = signal<Genre[]>([]);
  filmList = signal<FilmListItem[]>([]);

  loading = signal<boolean>(false);

  // ---------- Methods ----------

  getNextPage() {
    if (this.loading()) return;
    
    this.loading.set(true);
    this.page.set(this.page() + 1);

    this.searchByFiltersService
      .getFilmsByFilters(this.setFiltersQuery(), this.page())
      .subscribe({
        next: (data) => {
          console.log(data);
          this.filmList.update((prev) => [...prev, ...data.results]);
          this.loading.set(false);
        },
        error: (err) => this.loading.set(false)
      });
  }

  getGenreList() {
    this.genreService.getGenresList().subscribe((genreList) => {
      this.genreList.set(genreList.genres);
    });
  }

  initialFilmList() {
    this.loading.set(true);
    this.searchByFiltersService
      .getFilmsByFilters()
      .subscribe((data) => {
        this.filmList.set(data.results);
        this.loading.set(false);
      });
  }

  searchByfilters() {
    this.loading.set(true);
    const queryString = this.setFiltersQuery();
    
    this.searchByFiltersService
      .getFilmsByFilters(queryString)
      .subscribe((data) => {
        this.hasName.set(false);
        this.selectedGenreIds().length > 0 || this.selectedYear()
          ? this.hasOptions.set(true)
          : this.hasOptions.set(false);

        this.selectedGenreIds().length > 0
          ? this.hasGenres.set(true)
          : this.hasGenres.set(false);

        this.selectedYear() ? this.hasYear.set(true) : this.hasYear.set(false);

        this.filmList.set(data.results);
        this.loading.set(false);
      });
  }

  searchByName() {
    this.loading.set(true);
    const queryString = this.setNameQuery();

    if(!queryString) return

    this.searchByNameService.getFilmsByName(queryString).subscribe((data)=> {
      this.hasOptions.set(true);
      this.hasGenres.set(false);
      this.selectedGenreIds.set([]);
      this.hasYear.set(false);
      this.selectedYear.set('');
      this.hasName.set(true);
      this.filmList.set(data.results);
      this.loading.set(false);
    })
  }

  setSelectedGenres(genreId: number) {
    const genreIds = this.selectedGenreIds();

    if (genreIds.includes(genreId)) {
      this.selectedGenreIds.set(genreIds.filter((g) => g !== genreId));
    } else {
      this.selectedGenreIds.set([...genreIds, genreId]);
    }
  }

  setSelectedYear(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.slice(0, 4);
    this.selectedYear.set(value);
    input.value = value;
  }

  setSelectedName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedName.set(input.value);
    input.value = input.value;
    console.log(input.value);
  }

  setFiltersQuery(): string {
    let query = '';

    if (this.selectedGenreIds().length > 0) {
      const genresQuery = this.selectedGenreIds().reduce((acc, curr, currIndex) => {
          currIndex < this.selectedGenreIds().length - 1
            ? (acc += `${curr},`)
            : (acc += curr);
          return acc;
        },'with_genres=');

      query += '&' + genresQuery;
    }

    if (this.selectedYear()) {
      console.log('Desde create query', this.selectedYear());
      const yearQuery = `&primary_release_year=${this.selectedYear()}`;

      query += yearQuery;
    }

    if (query) {
      return query;
    } else {
      return '';
    }
  }

  setNameQuery() : string | null{
    if(this.selectedName().trim()){
      const safe = encodeURIComponent(this.selectedName());
      return `&query=${safe}`;
    }else{
      return null;
    }
    
  }

}
