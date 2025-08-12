import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SearchStateService } from '../search-state-service';
import { PosterUrlPipe } from 'app/pipes/poster-url-pipe';
import { FilmCard } from "./film-card/film-card";

@Component({
  selector: 'app-search-list',
  imports: [PosterUrlPipe, FilmCard],
  templateUrl: './search-list.html',
  styleUrl: './search-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchList {
  searchState = inject(SearchStateService);

}
