import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Genre } from 'app/models/genre-list.model';
import { FilmListItem } from 'app/models/popular-film.model';
import { GenreService } from 'app/services/tmdb/genre-service';
import { SearchByFiltersService } from 'app/services/tmdb/search-by-filters-service';
import { SearchByNameService } from 'app/services/tmdb/search-by-name-service';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {
  
  // ---------- Injections ----------

  isBRowser = isPlatformBrowser(inject(PLATFORM_ID));
  searchByFiltersService = inject(SearchByFiltersService);
  genreService = inject(GenreService);
  searchByNameService = inject(SearchByNameService);

  // ---------- life cycle ----------

  constructor(){
    this.initialFilmList();
    this.getGenreList();
  }

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

  sortOptions = signal<{by: 'vote_average' | 'primary_release_date' | 'popularity', order: 'desc' | 'asc'}>({by: 'popularity', order: 'desc'});

  // ---------- Methods ----------

  // Subscribers

  initialFilmList() {
    this.loading.set(true);
    this.searchByFiltersService
      .getFilmsByFilters({sort: this.sortOptions()})
      .subscribe((data) => {
        this.filmList.set(data.results);
        this.loading.set(false);
      });
  }

  getNextPage() {
    if (this.loading()) return;
    
    this.loading.set(true);
    this.page.set(this.page() + 1);

    if(this.selectedName() && this.hasName()){
      const query = this.setNameQuery();
      if (!query) return;
      this.searchByNameService
      .getFilmsByName(query, this.page())
      .subscribe({
        next: (data) => {
          this.filmList.update((prev) => [...prev, ...data.results]);
          this.loading.set(false);
        },
        error: (err) => this.loading.set(false)
      });
    }else{
      this.searchByFiltersService
      .getFilmsByFilters({query: this.setFiltersQuery(), page: this.page(), sort: this.sortOptions()})
      .subscribe({
        next: (data) => {
          this.filmList.update((prev) => [...prev, ...data.results]);
          this.loading.set(false);
        },
        error: (err) => this.loading.set(false)
      });
    }

    
  }

  getGenreList() {
    this.genreService.getGenresList().subscribe((genreList) => {
      this.genreList.set(genreList.genres);
    });
  }

  searchByfilters() {
    this.loading.set(true);
    const queryString = this.setFiltersQuery();

    if(this.isBRowser) window.scrollTo(0,0);

    this.searchByFiltersService
      .getFilmsByFilters({query: queryString, sort: this.sortOptions()})
      .subscribe((data) => {
        this.hasName.set(false);
        this.selectedName.set('');
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

    if(!queryString) return;

    if(this.isBRowser) window.scrollTo(0,0);

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

  // Form Setters

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
  }

  // Query setters

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

  genreIdsToText() : string{
    const genreArr : string[] = [];
    const textGenders = this.selectedGenreIds().map((genreId) =>
            this.genreList()
              .find((genreObj) => genreObj.id === genreId)
          )
          .filter((g): g is Genre => g !== undefined).forEach((item) => genreArr.push(item.name));
    return genreArr.join(', ');
  }

  // Order setters

  setOrderByPopularity() {
    if(!this.hasName()){
      if(this.sortOptions().order === 'desc'){
        this.sortOptions.set({by: 'popularity', order: 'asc'});
      }else if(this.sortOptions().order === 'asc'){
        this.sortOptions.set({by: 'popularity', order: 'desc'});
      }
      this.searchByfilters();
    }else{
      if(this.sortOptions().order === 'desc'){
        this.sortOptions.set({by: 'popularity', order: 'asc'});
        this.filmList.update((prev) => [...prev].sort((a, b) => a.popularity - b.popularity));
      }else if(this.sortOptions().order === 'asc'){

        this.sortOptions.set({by: 'popularity', order: 'desc'});
        this.filmList.update((prev) => [...prev].sort((a, b) => b.popularity - a.popularity));
      }
    }
  }

  setOrderByRate() {
    if(!this.hasName()){
      if(this.sortOptions().order === 'desc'){
        this.sortOptions.set({by: 'vote_average', order: 'asc'});
      }else if(this.sortOptions().order === 'asc'){
        this.sortOptions.set({by: 'vote_average', order: 'desc'});
      }
      this.searchByfilters();
    }else{
      if(this.sortOptions().order === 'desc'){
        this.sortOptions.set({by: 'vote_average', order: 'asc'});
        this.filmList.update((prev) => [...prev].sort((a, b) => a.vote_average - b.vote_average));
      }else if(this.sortOptions().order === 'asc'){

        this.sortOptions.set({by: 'vote_average', order: 'desc'});
        this.filmList.update((prev) => [...prev].sort((a, b) => b.vote_average - a.vote_average));
      }
    }
  }

  setOrderByYear() {
    if(!this.hasName()){
      if(this.sortOptions().order === 'desc'){
        this.sortOptions.set({by: 'primary_release_date', order: 'asc'});
      }else if(this.sortOptions().order === 'asc'){
        this.sortOptions.set({by: 'primary_release_date', order: 'desc'});
      }
      this.searchByfilters();
    }else{
      if(this.sortOptions().order === 'desc'){
        this.sortOptions.set({by: 'primary_release_date', order: 'asc'});
        this.filmList.update((prev) => [...prev].sort((a, b) => {
          return Number(new Date(a.release_date).getFullYear()) - Number(new Date(b.release_date).getFullYear())
        }));
      }else if(this.sortOptions().order === 'asc'){
        this.sortOptions.set({by: 'primary_release_date', order: 'desc'});
        this.filmList.update((prev) => [...prev].sort((a, b) => {
          return Number(new Date(b.release_date).getFullYear()) - Number(new Date(a.release_date).getFullYear())
        }));
      }
    }
  }

  changeOrder() {
    if(this.sortOptions().by === 'primary_release_date'){
      this.setOrderByYear();
    }else if(this.sortOptions().by === 'vote_average'){
      this.setOrderByRate();
    }else if(this.sortOptions().by === 'popularity'){
      this.setOrderByPopularity();
    }
  }

}
