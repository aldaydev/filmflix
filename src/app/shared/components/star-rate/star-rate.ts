import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ThemeService } from 'app/services/theme-service/theme-service';

@Component({
  selector: 'app-star-rate',
  imports: [],
  templateUrl: './star-rate.html',
  styleUrl: './star-rate.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarRate {
  themeService = inject(ThemeService);

  starPercentage = input<number>(0);
}
