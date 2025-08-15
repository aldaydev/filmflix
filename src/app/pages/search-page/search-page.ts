import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Searcher } from "./searcher/searcher";
import { SearchStateService } from './search-state-service';
import { SearchSorter } from "./search-sorter/search-sorter";
import { FilmList } from "app/shared/components/film-list/film-list";

@Component({
  selector: 'app-search-page',
  imports: [Searcher, SearchSorter, FilmList],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})
export class SearchPage {

  searchState = inject(SearchStateService);

}
