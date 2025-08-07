import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ThemeService } from 'app/services/theme-service/theme-service';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Input {
  themeService = inject(ThemeService);

  type = input<'text'>('text');
  label = input<string>('Label');
  size = input<'small' | 'big'>('small');
  placeholder = input<string | null> ("");
  disabled = input<boolean>(false);
}
