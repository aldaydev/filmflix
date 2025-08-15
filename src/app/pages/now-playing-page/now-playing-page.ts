import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FilmListItem } from 'app/models/popular-film.model';
import { NowPlayingFilmsService } from 'app/services/tmdb/now-playing-films-service';
import { FilmList } from "app/shared/components/film-list/film-list";

@Component({
  selector: 'app-now-playing-page',
  imports: [FilmList],
  templateUrl: './now-playing-page.html',
  styleUrl: './now-playing-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NowPlayingFilmsService]
})
export class NowPlayingPage implements OnInit{
  nowPlayingFilmList = signal<FilmListItem[]>([]);
  nowPlayingService = inject(NowPlayingFilmsService);
  page = signal<number>(1);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.loading.set(true);
    this.nowPlayingService.getUpcomingFilms().subscribe(data => {
      this.nowPlayingFilmList.set(data.results);
      this.loading.set(false);
    })
  }

  getNextPage() {
    this.loading.set(true);
    this.page.update(prev => prev + 1);

    const newPage = this.page();

    this.nowPlayingService.getUpcomingFilms(newPage).subscribe(data => {
      this.nowPlayingFilmList.update(prev => [...prev, ...data.results]);
      this.loading.set(false);
    });
  }

}
