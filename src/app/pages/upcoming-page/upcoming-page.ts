import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FilmListItem } from 'app/models/popular-film.model';
import { UpcomingFilmsService } from 'app/services/tmdb/upcoming-films-service';
import { UpcomingList } from "./upcoming-list/upcoming-list";

@Component({
  selector: 'app-upcoming-page',
  imports: [UpcomingList],
  templateUrl: './upcoming-page.html',
  styleUrl: './upcoming-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UpcomingFilmsService]
})
export class UpcomingPage implements OnInit {
  upcomingFilmsService = inject(UpcomingFilmsService);
  upcomingFilmList = signal<FilmListItem[]>([]);
  page = signal<number>(1);

  ngOnInit(): void {
    this.upcomingFilmsService.getUpcomingFilms().subscribe(data => {
      const now = new Date();
      const onlyUpcoming = data.results.filter(film => {
        const release = new Date(film.release_date);
        return now.getFullYear() <= release.getFullYear();
      })
      this.upcomingFilmList.set(onlyUpcoming)
    });
  }

  getNextPage() {
    // Incrementar la página
    this.page.update(prev => prev + 1);

    const newPage = this.page();

    this.upcomingFilmsService.getUpcomingFilms(newPage).subscribe(data => {
      this.upcomingFilmList.update(prev => [...prev, ...data.results]);
    });
  }

}
