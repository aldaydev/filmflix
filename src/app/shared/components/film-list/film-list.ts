import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PosterUrlPipe } from 'app/pipes/poster-url-pipe';
import { FilmCard } from './film-card/film-card';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { FilmListItem } from 'app/models/popular-film.model';

@Component({
  selector: 'app-film-list',
  imports: [PosterUrlPipe, FilmCard, InfiniteScrollDirective],
  templateUrl: './film-list.html',
  styleUrl: './film-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmList {

  // ---------- Properties ----------

  filmList = input<FilmListItem[]>([]);
  loading = input<boolean>(true);
  nextPage = output<void>();

  // ---------- Methods ----------

  onScroll() {
    this.nextPage.emit();
  }

  trackByFilmId(index: number, film: any): number {
    return film.id;
  }


}
