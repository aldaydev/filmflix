import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-home-info-card',
  imports: [],
  templateUrl: './home-info-card.html',
  styleUrl: './home-info-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class homeInfoCard {

  // ---------- Inputs ----------

  title = input('');
  text = input('');
  iconPath = input('');
  iconName = input('');

}
