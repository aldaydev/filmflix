import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderThemeBg } from 'app/directives';
import { ToggleTheme } from 'app/shared/ui/toggle-theme/toggle-theme';

@Component({
  selector: 'app-header',
  imports: [ToggleTheme, RouterModule, HeaderThemeBg],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {

}
