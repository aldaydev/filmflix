import { ChangeDetectionStrategy, Component, inject, input, Input, output } from '@angular/core';
import { ThemeService } from 'app/services/theme-service/theme-service';

interface ButtonIcon {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Button {

  themeService = inject(ThemeService);

  fill = input<'solid' | 'outline'>('solid');
  type = input<string | null>("button")
  size = input<'small' | 'big'>('small');
  color = input<'primary' | 'secondary' | 'none'>('primary');
  label = input<string> ('botón');
  disabled = input<boolean>(false)
  handleClick = output<void>();
  icon = input<ButtonIcon | null>();
}
