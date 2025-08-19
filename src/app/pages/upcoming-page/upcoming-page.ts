import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FilmListItem } from 'app/models/popular-film.model';
import { UpcomingFilms } from 'app/models/upcoming-film.model';
import { UpcomingFilmsService } from 'app/services/tmdb/upcoming-films-service';
import { FilmList } from "app/shared/components/film-list/film-list";

@Component({
  selector: 'app-upcoming-page',
  imports: [FilmList],
  templateUrl: './upcoming-page.html',
  styleUrl: './upcoming-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UpcomingFilmsService]
})
export class UpcomingPage implements OnInit {

  // ---------- Injections ----------

  upcomingFilmsService = inject(UpcomingFilmsService);
  private meta = inject(Meta);
  private title = inject(Title);

  // ---------- Properties ----------

  upcomingFilmList = signal<FilmListItem[]>([]);
  page = signal<number>(1);
  loading = signal<boolean>(true);

  // ---------- Life cycle ----------

  ngOnInit(): void {
    this.setMetaTags();
    this.loading.set(true);
    this.upcomingFilmsService.getUpcomingFilms().subscribe(data => {
      const onlyUpcoming = this.filterOnlyUpcomingFilms(data);
      this.upcomingFilmList.set(onlyUpcoming);

      if(this.upcomingFilmList().length < 20){
        this.getNextPage();
      }
      this.loading.set(false);
    });
  }

  // ---------- Methods ----------

  filterOnlyUpcomingFilms(filmList: UpcomingFilms) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignora la hora, minutos y segundos

    const onlyUpcoming = filmList.results.filter(film => {
      const release = new Date(film.release_date);
      release.setHours(0, 0, 0, 0); // Ignora la hora
      return release >= today;
    });

    return onlyUpcoming;
  }

  getNextPage() {
    this.loading.set(true);
    this.page.update(prev => prev + 1);

    const newPage = this.page();

    this.upcomingFilmsService.getUpcomingFilms(newPage).subscribe(data => {
      const onlyUpcoming = this.filterOnlyUpcomingFilms(data);
      this.upcomingFilmList.update(prev => [...prev, ...onlyUpcoming]);
      if(this.upcomingFilmList().length < 20){
        this.getNextPage();
      }
      this.loading.set(false);
    });
  }

  private setMetaTags() {

    // Common tags
    this.title.setTitle('FILMFLIX - Estrenos');
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Próximos estrenos. FILMFLIX by AldayDev'
    });
    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'películas, cine, estrenos, cartelera, aldaydev' 
    });

    // Open Graph tags
    this.meta.updateTag({ 
      property: 'og:title', 
      content: 'FILMFLIX - Estrenos' 
    });
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Próximos estrenos. FILMFLIX by AldayDev' 
    });
    this.meta.updateTag({ 
      property: 'og:image', 
      content: 'https://filmflix.alday.dev/assets/captures/filmflix_capture_upcoming_1200px.webp' 
    });
    this.meta.updateTag({ 
      property: 'og:url', 
      content: 'https://filmflix.alday.dev/upcoming' 
    });

    // Twitter tags
    this.meta.updateTag({ 
      name: 'twitter:card', 
      content: 'summary_large_image' 
    });
    this.meta.updateTag({ 
      name: 'twitter:title', 
      content: 'FILMFLIX - Estrenos' 
    });
    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Próximos estrenos. FILMFLIX by AldayDev' 
    });
    this.meta.updateTag({ 
      name: 'twitter:image', 
      content: 'https://filmflix.alday.dev/assets/captures/filmflix_capture_upcoming_1200px.webp' 
    });
    this.meta.updateTag({ 
      name: 'twitter:url', 
      content: 'https://filmflix.alday.dev/upcoming' 
    });

  }

}
