import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, QueryList, signal, ViewChildren } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchByFilters implements OnInit{
  searchByFiltersService = inject(SearchByFiltersService);
  genreService = inject(GenreService);
  searchStateService = inject(SearchStateService);
  genreList = signal<Genre[]>([]);

  @ViewChildren('genreCheckbox') genreCheckbox!: QueryList<ElementRef>

  ngOnInit(): void {
    this.genreService.getGenresList()
      .subscribe((genreList) => {
        this.genreList.set(genreList.genres);
      })
  }

}
