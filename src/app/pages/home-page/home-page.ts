import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeHero } from "./home-hero/home-hero";
import { HomeWhatsNew } from "./home-whats-new/home-whats-new";
import { HomeCarousel } from "./home-carousel/home-carousel";
import { HomeFeatures } from "./home-features/home-features";
import { HomeFaq } from "./home-faq/home-faq";

@Component({
  selector: 'app-home',
  imports: [HomeHero, HomeWhatsNew, HomeCarousel, HomeFeatures, HomeFaq],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  
}
