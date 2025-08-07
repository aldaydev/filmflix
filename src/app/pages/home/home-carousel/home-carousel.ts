import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Film, PopularFilms } from 'app/models/film.model';
import { PopularFilmsService } from 'app/services/tmdb/popular-films-service';
import { FilmCarousel } from 'app/shared/components/film-carousel/film-carousel';

@Component({
  selector: 'app-home-carousel',
  imports: [FilmCarousel],
  templateUrl: './home-carousel.html',
  styleUrl: './home-carousel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCarousel {
  popularFilmService = inject(PopularFilmsService);
  popularFilmList = signal<Film[] | null>(null)

  ngOnInit(): void {
    this.popularFilmService.getPopularFilms().subscribe((data: PopularFilms) => {
      this.popularFilmList.set(data.results);
    });
  }
}
