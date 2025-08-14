import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SearchStateService } from '../search-state-service';

@Component({
  selector: 'app-search-sorter',
  imports: [],
  templateUrl: './search-sorter.html',
  styleUrl: './search-sorter.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchSorter {

  searchState = inject(SearchStateService);

}
