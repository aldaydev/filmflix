import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FilmCarousel } from "app/shared/components/film-carousel/film-carousel";

@Component({
  selector: 'app-home-carousel',
  imports: [FilmCarousel],
  templateUrl: './home-carousel.html',
  styleUrl: './home-carousel.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeCarousel {

}
