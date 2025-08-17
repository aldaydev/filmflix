import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { ThemeService } from 'app/services/theme-service/theme-service';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Input {

  // ---------- Injections ----------

  themeService = inject(ThemeService);

  // ---------- Properties ----------

  type = input<'text'>('text');
  label = input<string>('');
  size = input<'small' | 'big'>('big');
  placeholder = input<string | null> ("");
  disabled = input<boolean>(false);
  value = input<string>('');
  inputEvent = output<any>();
  tabindex = input<0 | -1>(0);
  id = input.required<string>();
  
}
