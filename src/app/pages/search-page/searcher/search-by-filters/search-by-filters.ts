import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Genre } from 'app/models/film-details.model';
import { GenreService } from 'app/services/tmdb/genre-service';
import { map } from 'rxjs';

@Component({
  selector: 'app-search-by-filters',
  imports: [],
  templateUrl: './search-by-filters.html',
  styleUrl: './search-by-filters.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchByFilters implements OnInit {
  genreService = inject(GenreService);
  genreList = signal<string[]>([]);

  ngOnInit(): void {
    this.genreService.getGenresList()
      .pipe(
        map(genreRes => genreRes.genres.reduce((acc : string[], curr : Genre) => {
          acc.push(curr.name);
          return acc;
        }, []))
      )
      .subscribe((genreList) => {
        console.log(genreList);
        this.genreList.set(genreList);
      })
  }
}
