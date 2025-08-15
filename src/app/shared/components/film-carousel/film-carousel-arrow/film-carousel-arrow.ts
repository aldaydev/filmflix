import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ThemeService } from 'app/services/theme-service/theme-service';

@Component({
  selector: 'app-film-carousel-arrow',
  imports: [],
  templateUrl: './film-carousel-arrow.html',
  styleUrl: './film-carousel-arrow.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmCarouselArrow {

  // ---------- Injections ----------

  themeService = inject(ThemeService);

  // ---------- Properties ----------

  position = input('left');
}
