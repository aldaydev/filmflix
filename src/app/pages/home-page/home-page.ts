import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeHero } from "./home-hero/home-hero";
import { HomeWhatsNew } from "./home-whats-new/home-whats-new";

@Component({
  selector: 'app-home',
  imports: [HomeHero, HomeWhatsNew],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

}
