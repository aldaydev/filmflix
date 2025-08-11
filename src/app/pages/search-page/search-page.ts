import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Searcher } from "./searcher/searcher";
import { GenreService } from 'app/services/tmdb/genre-service';
import { SearchStateService } from './search-state-service';

@Component({
  selector: 'app-search-page',
  imports: [Searcher],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GenreService, SearchStateService]
})
export class SearchPage {
  genreList = signal<string[]>([]);
}
