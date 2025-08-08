import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InfoCard } from "app/shared/components/info-card/info-card";

@Component({
  selector: 'app-home-features',
  imports: [InfoCard],
  templateUrl: './home-features.html',
  styleUrl: './home-features.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeFeatures {

}
