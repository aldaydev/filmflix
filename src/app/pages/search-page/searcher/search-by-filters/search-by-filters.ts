import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, QueryList, signal, ViewChild, viewChild, ViewChildren } from '@angular/core';
import { Genre } from 'app/models/film-details.model';
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
  searchByFiltersService = inject(SearchByFiltersService);
  genreService = inject(GenreService);
  searchStateService = inject(SearchStateService);

  @ViewChildren('genreCheckbox') genreCheckbox!: QueryList<ElementRef>;

  @ViewChild('yearInput') yearInput!: ElementRef<HTMLInputElement>;


}
