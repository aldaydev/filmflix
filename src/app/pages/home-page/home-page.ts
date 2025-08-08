import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeHero } from "./home-hero/home-hero";
import { HomeWhatsNew } from "./home-whats-new/home-whats-new";
import { HomeCarousel } from "./home-carousel/home-carousel";

@Component({
  selector: 'app-home',
  imports: [HomeHero, HomeWhatsNew, HomeCarousel],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

}
