import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FilmListItem } from 'app/models/popular-film.model';
import { FilmCard } from 'app/pages/search-page/search-list/film-card/film-card';
import { PosterUrlPipe } from 'app/pipes/poster-url-pipe';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-upcoming-list',
  imports: [InfiniteScrollDirective, FilmCard, PosterUrlPipe],
  templateUrl: './upcoming-list.html',
  styleUrl: './upcoming-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpcomingList {

  filmList = input<FilmListItem[]>([]);
  getNextPage = output<void>();

  trackByFilmId(index: number, film: any): number {
    return film.id;
  }

}
