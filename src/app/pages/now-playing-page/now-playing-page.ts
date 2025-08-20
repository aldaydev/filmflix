import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FilmListItem } from 'app/models/popular-film.model';
import { NowPlayingFilmsService } from 'app/services/tmdb/now-playing-films-service';
import { FilmList } from "app/shared/components/film-list/film-list";

@Component({
  selector: 'app-now-playing-page',
  imports: [FilmList],
  templateUrl: './now-playing-page.html',
  styleUrl: './now-playing-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NowPlayingFilmsService]
})
export class NowPlayingPage implements OnInit{

  // ---------- Injections ----------

  private meta = inject(Meta);
  private title = inject(Title);

  nowPlayingService = inject(NowPlayingFilmsService);

  // ---------- Properties ----------

  nowPlayingFilmList = signal<FilmListItem[]>([]);
  page = signal<number>(1);
  loading = signal<boolean>(true);

  // ---------- Life cycle ----------

  ngOnInit(): void {
    this.setMetaTags();
    this.loading.set(true);
    this.nowPlayingService.getNowPlayingFilms().subscribe(data => {
      this.nowPlayingFilmList.set(data.results);
      this.loading.set(false);
    })
  }

  // ---------- Methods ----------

  getNextPage() {
    this.page.update(prev => prev + 1);

    const newPage = this.page();

    this.nowPlayingService.getNowPlayingFilms(newPage).subscribe(data => {
      this.nowPlayingFilmList.update(prev => {
        const uniqueNewFilms = data.results.filter(newFilm => !prev.some(film => film.id === newFilm.id));
        return [...prev, ...uniqueNewFilms];
      });
    });
  }

  private setMetaTags() {

    // Common tags
    this.title.setTitle('FILMFLIX - Cartelera');
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Películas en cartelera. FILMFLIX by AldayDev' 
    });
    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'películas, cine, estrenos, cartelera, aldaydev' 
    });

    // Open Graph tags
    this.meta.updateTag({ 
      property: 'og:title', 
      content: 'FILMFLIX - Cartelera' 
    });
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Películas en cartelera. FILMFLIX by AldayDev'
    });
    this.meta.updateTag({ 
      property: 'og:image', 
      content: 'https://filmflix.alday.dev/assets/captures/filmflix_capture_now-playing_1200px.webp' 
    });
    this.meta.updateTag({ 
      property: 'og:url', 
      content: 'https://filmflix.alday.dev/now-playing' 
    });

    // Twitter tags
    this.meta.updateTag({ 
      name: 'twitter:card', 
      content: 'summary_large_image' 
    });
    this.meta.updateTag({ 
      name: 'twitter:title', 
      content: 'FILMFLIX - Cartelera' 
    });
    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Películas en cartelera. FILMFLIX by AldayDev'
    });
    this.meta.updateTag({ 
      name: 'twitter:image', 
      content: 'https://filmflix.alday.dev/assets/captures/filmflix_capture_now-playing_1200px.webp' 
    });
    this.meta.updateTag({ 
      name: 'twitter:url', 
      content: 'https://filmflix.alday.dev/now-playing' 
    });

  }

}
