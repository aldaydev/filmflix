import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Film } from 'app/models/film.model';
import { PopularFilmsService } from 'app/services/tmdb/popular-films-service';
import { FilmCarousel } from 'app/shared/components/film-carousel/film-carousel';
import { map } from 'rxjs';

@Component({
  selector: 'app-home-carousel',
  imports: [FilmCarousel],
  templateUrl: './home-carousel.html',
  styleUrl: './home-carousel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCarousel {
  popularFilmService = inject(PopularFilmsService);
  popularFilmList = signal<Film[] | null>(null);

  ngOnInit(): void {
    this.popularFilmService.getPopularFilms()
      .pipe(
        map(data => data.results.slice(0, 10))
      )
      .subscribe((films) => {
        this.popularFilmList.set(films);
      });
  }
}
