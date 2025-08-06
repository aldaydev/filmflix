import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToggleThemeIcon } from "./toggle-theme-icon/toggle-theme-icon";
import { ThemeService } from 'app/services/theme-service/theme-service';

@Component({
  selector: 'app-toggle-theme',
  imports: [ToggleThemeIcon],
  templateUrl: './toggle-theme.html',
  styleUrl: './toggle-theme.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleTheme {
  themeService = inject(ThemeService);
}
