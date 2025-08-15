import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SearchStateService } from '../search-state-service';
import { PosterUrlPipe } from 'app/pipes/poster-url-pipe';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { SearchByFiltersService } from 'app/services/tmdb/search-by-filters-service';
import { FilmCard } from 'app/shared/components/film-list/film-card/film-card';

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
