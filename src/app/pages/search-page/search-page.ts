import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Searcher } from "./searcher/searcher";
import { SearchStateService } from './search-state-service';
import { SearchSorter } from "./search-sorter/search-sorter";
import { FilmList } from "app/shared/components/film-list/film-list";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search-page',
  imports: [Searcher, SearchSorter, FilmList],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})
export class SearchPage implements OnInit {

  // ---------- Injections ----------

  private meta = inject(Meta);
  private title = inject(Title);

  // ---------- Properties ----------

  searchState = inject(SearchStateService);

  // ---------- Life cycle ----------

  ngOnInit(): void {
    this.setMetaTags();
  }

  // ---------- Methods ----------

  private setMetaTags() {

    // Common tags
    this.title.setTitle('FILMFLIX - Películas');
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Buscador de películas en FILMFLIX by AldayDev' 
    });
    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'películas, cine, estrenos, cartelera, aldaydev' 
    });

    // Open Graph tags
    this.meta.updateTag({ 
      property: 'og:title', 
      content: 'FILMFLIX - Películas' 
    });
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Buscador de películas en FILMFLIX by AldayDev' 
    });
    this.meta.updateTag({ 
      property: 'og:image', 
      content: 'https://filmflix.alday.dev/assets/captures/filmflix_capture_search_1200px.webp' 
    });
    this.meta.updateTag({ 
      property: 'og:url', 
      content: 'https://filmflix.alday.dev/search' 
    });

    // Twitter tags
    this.meta.updateTag({ 
      name: 'twitter:card', 
      content: 'summary_large_image' 
    });
    this.meta.updateTag({ 
      name: 'twitter:title', 
      content: 'FILMFLIX - Películas' 
    });
    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Buscador de películas en FILMFLIX by AldayDev'
    });
    this.meta.updateTag({ 
      name: 'twitter:image', 
      content: 'https://filmflix.alday.dev/assets/captures/filmflix_capture_search_1200px.webp' 
    });
    this.meta.updateTag({ 
      name: 'twitter:url', 
      content: 'https://filmflix.alday.dev/search' 
    });

  }

}
