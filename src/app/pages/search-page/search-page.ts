import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Searcher } from "./searcher/searcher";
import { GenreService } from 'app/services/tmdb/genre-service';
import { SearchStateService } from './search-state-service';
import { SearchByFiltersService } from 'app/services/tmdb/search-by-filters-service';
import { SearchByFilters } from './searcher/search-by-filters/search-by-filters';

@Component({
  selector: 'app-search-page',
  imports: [Searcher],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GenreService, SearchStateService, SearchByFiltersService]
})
export class SearchPage {


}
