import { ChangeDetectionStrategy, Component, HostListener, inject, input, output, signal } from '@angular/core';
import { PosterUrlPipe } from 'app/pipes/poster-url-pipe';
import { FilmCard } from './film-card/film-card';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { FilmListItem } from 'app/models/popular-film.model';
import { ThemeService } from 'app/services/theme-service/theme-service';

@Component({
  selector: 'app-film-list',
  imports: [PosterUrlPipe, FilmCard, InfiniteScrollDirective],
  templateUrl: './film-list.html',
  styleUrl: './film-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmList {

  // ---------- Injections ----------

  themeService = inject(ThemeService);

  // ---------- Properties ----------

  filmList = input<FilmListItem[]>([]);
  loading = input<boolean>(true);
  nextPage = output<void>();

  showGoToTopButton = signal<boolean>(false);

  // ---------- Host Listener ----------

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    if (scrollY > 0) {
      this.showGoToTopButton.set(true);
    } else {
      this.showGoToTopButton.set(false);
    }
  }


  // ---------- Methods ----------

  onScroll() {
    this.nextPage.emit();
  }

  trackByFilmId(index: number, film: any): number {
    return film.id;
  }

  goToTop(){
    window.scrollTo(0, 0);
  }


}
