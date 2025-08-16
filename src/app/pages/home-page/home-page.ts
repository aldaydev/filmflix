import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { HomeHero } from "./home-hero/home-hero";
import { HomeWhatsNew } from "./home-whats-new/home-whats-new";
import { HomeCarousel } from "./home-carousel/home-carousel";
import { HomeFeatures } from "./home-features/home-features";
import { HomeFaq } from "./home-faq/home-faq";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [HomeHero, HomeWhatsNew, HomeCarousel, HomeFeatures, HomeFaq],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit{

  // ---------- Injections ----------

  private meta = inject(Meta);
  private title = inject(Title);

  // ---------- Life cycle ----------

  ngOnInit(): void {
    this.setMetaTags();
  }

  // ---------- Methods ----------

  private setMetaTags() {

    // Common tags
    this.title.setTitle('FILMFLIX by Aldaydev');
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Bienvenido a FILMFLIX, buscador de películas by AldayDev' 
    });
    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'películas, cine, estrenos, cartelera, aldaydev' 
    });

    // Open Graph tags
    this.meta.updateTag({ 
      property: 'og:title', 
      content: 'FILMFLIX by AldayDev' 
    });
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Bienvenido a FILMFLIX, buscador de películas by AldayDev' 
    });
    this.meta.updateTag({ 
      property: 'og:image', 
      content: 'https://filmflix.alday.dev/assets/captures/captures/filmflix_capture_1200px.webp' 
    });
    this.meta.updateTag({ 
      property: 'og:url', 
      content: 'https://filmflix.alday.dev/' 
    });

    // Twitter tags
    this.meta.updateTag({ 
      name: 'twitter:card', 
      content: 'summary_large_image' 
    });
    this.meta.updateTag({ 
      name: 'twitter:title', 
      content: 'FILMFLIX by AldayDev' 
    });
    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Bienvenido a FILMFLIX, buscador de películas by AldayDev' 
    });
    this.meta.updateTag({ 
      name: 'twitter:image', 
      content: 'https://filmflix.alday.dev/assets/captures/captures/filmflix_capture_1200px.webp' 
    });
    this.meta.updateTag({ 
      name: 'twitter:url', 
      content: 'https://filmflix.alday.dev/' 
    });

  }

}
