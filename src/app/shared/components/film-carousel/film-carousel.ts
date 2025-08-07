import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PopularFilmsService } from 'app/services/tmdb/popular-films-service';

@Component({
  selector: 'app-film-carousel',
  imports: [],
  templateUrl: './film-carousel.html',
  styleUrl: './film-carousel.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmCarousel implements OnInit {

  popularFilmService = inject(PopularFilmsService);

  ngOnInit(): void {
    this.popularFilmService.getPopularFilms().subscribe((data) => {
      console.log(data);
    });
  }

}
