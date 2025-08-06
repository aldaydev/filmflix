import { AfterViewInit, ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-toggle-icon',
  imports: [],
  templateUrl: './toggle-theme-icon.html',
  styleUrl: './toggle-theme-icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleThemeIcon implements AfterViewInit {
  // protected iconToShow = computed(() => this.theme() === 'dark' ? 'moon' : 'sun');
  theme = input('dark');
  firstRender = signal(true);

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.firstRender.set(false);
    });
  }


}
