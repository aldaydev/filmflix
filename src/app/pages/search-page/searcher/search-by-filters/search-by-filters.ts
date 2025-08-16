import { Component, ElementRef, inject, input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GenreService } from 'app/services/tmdb/genre-service';
import { SearchStateService } from '../../search-state-service';
import { Button } from "app/shared/ui/button/button";
import { SearchByFiltersService } from 'app/services/tmdb/search-by-filters-service';

@Component({
  selector: 'app-search-by-filters',
  imports: [Button],
  templateUrl: './search-by-filters.html',
  styleUrl: './search-by-filters.css',
})
export class SearchByFilters {

  // ---------- Injections ----------

  searchByFiltersService = inject(SearchByFiltersService);
  genreService = inject(GenreService);
  searchStateService = inject(SearchStateService);

  // ---------- Properties ----------

  isOpen = input<boolean>(false);

  @ViewChildren('genreCheckbox') genreCheckbox!: QueryList<ElementRef>;

  @ViewChild('yearInput') yearInput!: ElementRef<HTMLInputElement>;


}
