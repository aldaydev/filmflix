import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SearchStateService } from '../search-state-service';
import { ScreenSizeService } from 'app/services/screen-size-service/screen-size-service';

@Component({
  selector: 'app-search-sorter',
  imports: [],
  templateUrl: './search-sorter.html',
  styleUrl: './search-sorter.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchSorter {

  // ---------- Injections ----------

  searchState = inject(SearchStateService);
  screenSize = inject(ScreenSizeService);

  // ---------- Methods ----------

  handleSortChange(event: Event){
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    value === 'year' ? this.searchState.setOrderByYear() : this.searchState.setOrderByRate();
    
    switch (value){
      case "year":
        this.searchState.setOrderByYear();
        break;
      case "rate":
        this.searchState.setOrderByRate();
        break;
      case "popularity":
        console.log('POR POPULARIDAD')
        this.searchState.setOrderByPopularity();
        break;
    }
  }

}
