import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { UpcomingList } from "../upcoming-page/upcoming-list/upcoming-list";
import { FilmListItem } from 'app/models/popular-film.model';
import { NowPlayingFilmsService } from 'app/services/tmdb/now-playing-films-service';

@Component({
  selector: 'app-now-playing-page',
  imports: [UpcomingList],
  templateUrl: './now-playing-page.html',
  styleUrl: './now-playing-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NowPlayingFilmsService]
})
export class NowPlayingPage implements OnInit{
  nowPlayingFilmList = signal<FilmListItem[]>([]);
  nowPlayingService = inject(NowPlayingFilmsService);
  page = signal<number>(1);

  ngOnInit(): void {
    this.nowPlayingService.getUpcomingFilms().subscribe(data => {
      this.nowPlayingFilmList.set(data.results);
    })
  }

  getNextPage() {

    this.page.update(prev => prev + 1);

    const newPage = this.page();

    this.nowPlayingService.getUpcomingFilms(newPage).subscribe(data => {
      this.nowPlayingFilmList.update(prev => [...prev, ...data.results]);
    });
  }

}
