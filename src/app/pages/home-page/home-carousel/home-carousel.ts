import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CarouselFilmData } from 'app/models/film-carousel.model';
import { PopularFilm } from 'app/models/popular-film.model';
import { PopularFilmsService } from 'app/services/tmdb/popular-films-service';
import { FilmCarousel } from 'app/shared/components/film-carousel/film-carousel';
import { title } from 'process';
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
  popularFilmList = signal<CarouselFilmData[] | null>(null);

  ngOnInit(): void {
    this.popularFilmService.getPopularFilms()
      .pipe(
        map(data => {
          return data.results.slice(0, 10).map((film) => (
            {
              id: film.id,
              title: film.title,
              poster_path: film.poster_path
            }
          ))
        })
      )
      .subscribe((films) => {
        this.popularFilmList.set(films);
      });
  }

  // ngOnInit(): void {
  //   this.popularFilmService.getPopularFilms()
  //     .pipe(
  //       map(data => data.results.slice(0, 10))
  //     )
  //     .subscribe((films) => {
  //       this.popularFilmList.set(films);
  //     });
  // }
}
