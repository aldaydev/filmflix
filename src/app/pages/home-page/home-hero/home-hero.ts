import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from 'app/services/theme-service/theme-service';
import { Button } from "app/shared/ui/button/button";

@Component({
  selector: 'app-home-hero',
  imports: [Button],
  templateUrl: './home-hero.html',
  styleUrl: './home-hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeHero {
  themeService = inject(ThemeService);
}
