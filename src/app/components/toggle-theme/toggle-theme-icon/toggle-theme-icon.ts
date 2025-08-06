import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-toggle-icon',
  imports: [],
  templateUrl: './toggle-theme-icon.html',
  styleUrl: './toggle-theme-icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleThemeIcon {
  // protected iconToShow = computed(() => this.theme() === 'dark' ? 'moon' : 'sun');
  theme = input('dark');
}
