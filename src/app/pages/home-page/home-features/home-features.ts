import { ChangeDetectionStrategy, Component } from '@angular/core';
import { homeInfoCard } from './info-card/home-info-card';
homeInfoCard

@Component({
  selector: 'app-home-features',
  imports: [homeInfoCard],
  templateUrl: './home-features.html',
  styleUrl: './home-features.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeFeatures {

}
