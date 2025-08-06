import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToggleTheme } from "../toggle-theme/toggle-theme";
import { RouterModule } from '@angular/router';
import { HeaderThemeBg } from 'app/directives';

@Component({
  selector: 'app-header',
  imports: [ToggleTheme, RouterModule, HeaderThemeBg],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {

}
