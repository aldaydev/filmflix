import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { Film } from 'app/models/film.model';
import { PopularFilmsService } from 'app/services/tmdb/popular-films-service';

@Component({
  selector: 'app-film-carousel',
  imports: [],
  templateUrl: './film-carousel.html',
  styleUrl: './film-carousel.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmCarousel {

  filmList = input<Film[] | null>(null)

}
