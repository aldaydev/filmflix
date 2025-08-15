import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FilmListItem } from 'app/models/popular-film.model';
import { UpcomingFilmsService } from 'app/services/tmdb/upcoming-films-service';
import { FilmList } from "app/shared/components/film-list/film-list";

@Component({
  selector: 'app-upcoming-page',
  imports: [FilmList],
  templateUrl: './upcoming-page.html',
  styleUrl: './upcoming-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UpcomingFilmsService]
})
export class UpcomingPage implements OnInit {

  // ---------- Injections ----------

  upcomingFilmsService = inject(UpcomingFilmsService);

  // ---------- Properties ----------

  upcomingFilmList = signal<FilmListItem[]>([]);
  page = signal<number>(1);
  loading = signal<boolean>(true);

  // ---------- Life cycle ----------

  ngOnInit(): void {
    this.loading.set(true);
    this.upcomingFilmsService.getUpcomingFilms().subscribe(data => {
      const now = new Date();
      const onlyUpcoming = data.results.filter(film => {
        const release = new Date(film.release_date);
        return now.getFullYear() <= release.getFullYear();
      })
      this.upcomingFilmList.set(onlyUpcoming);
      this.loading.set(false);
    });
  }

  // ---------- Methods ----------

  getNextPage() {
    this.loading.set(true);
    this.page.update(prev => prev + 1);

    const newPage = this.page();

    this.upcomingFilmsService.getUpcomingFilms(newPage).subscribe(data => {
      this.upcomingFilmList.update(prev => [...prev, ...data.results]);
      this.loading.set(false);
    });
  }

}
