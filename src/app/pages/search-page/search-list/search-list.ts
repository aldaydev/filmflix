import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SearchStateService } from '../search-state-service';
import { PosterUrlPipe } from 'app/pipes/poster-url-pipe';
import { FilmCard } from "./film-card/film-card";
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { SearchByFiltersService } from 'app/services/tmdb/search-by-filters-service';

@Component({
  selector: 'app-search-list',
  imports: [PosterUrlPipe, FilmCard, InfiniteScrollDirective],
  templateUrl: './search-list.html',
  styleUrl: './search-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchList {

  searchByFiltersService = inject(SearchByFiltersService);
  searchState = inject(SearchStateService);



  onScroll() {
    this.searchState.getNextPage();

  }

  trackByFilmId(index: number, film: any): number {
    return film.id;
  }

}
