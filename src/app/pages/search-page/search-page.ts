import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Searcher } from "./searcher/searcher";
import { GenreService } from 'app/services/tmdb/genre-service';
import { SearchStateService } from './search-state-service';
import { SearchByFiltersService } from 'app/services/tmdb/search-by-filters-service';
import { SearchByFilters } from './searcher/search-by-filters/search-by-filters';
import { SearchList } from "./search-list/search-list";
import { SearchByNameService } from 'app/services/tmdb/search-by-name-service';
import { SearchSorter } from "./search-sorter/search-sorter";

@Component({
  selector: 'app-search-page',
  imports: [Searcher, SearchList, SearchSorter],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})
export class SearchPage {

  searchState = inject(SearchStateService);


}
