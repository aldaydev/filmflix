import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { Film } from 'app/models/film.model';
import { PosterUrlPipe } from 'app/pipes/poster-url-pipe-pipe';
import { PopularFilmsService } from 'app/services/tmdb/popular-films-service';
import { FilmCarouselArrow } from "./film-carousel-arrow/film-carousel-arrow";

@Component({
  selector: 'app-film-carousel',
  imports: [PosterUrlPipe, FilmCarouselArrow],
  templateUrl: './film-carousel.html',
  styleUrl: './film-carousel.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmCarousel {

  filmList = input<Film[] | null>(null)

}
