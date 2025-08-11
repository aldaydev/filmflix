import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, QueryList, signal, ViewChildren } from '@angular/core';
import { Genre } from 'app/models/film-details.model';
import { GenreService } from 'app/services/tmdb/genre-service';
import { SearchStateService } from '../../search-state-service';

@Component({
  selector: 'app-search-by-filters',
  imports: [],
  templateUrl: './search-by-filters.html',
  styleUrl: './search-by-filters.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchByFilters implements OnInit, AfterViewInit{
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

  // ngOnInit(): void {
  //   this.genreService.getGenresList()
  //     .pipe(
  //       map(genreRes => genreRes.genres.reduce((acc : string[], curr : Genre) => {
  //         acc.push(curr.name);
  //         return acc;
  //       }, []))
  //     )
  //     .subscribe((genreList) => {
  //       this.genreList.set(genreList);
  //     })
  // }

  ngAfterViewInit(): void {
    console.log(this.genreCheckbox);
  }
}
