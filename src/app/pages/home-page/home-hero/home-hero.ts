import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from 'app/services/theme-service/theme-service';

@Component({
  selector: 'app-home-hero',
  imports: [],
  templateUrl: './home-hero.html',
  styleUrl: './home-hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeHero {
  themeService = inject(ThemeService);
}
