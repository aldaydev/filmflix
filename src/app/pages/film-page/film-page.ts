import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmDetails, Similar } from 'app/models/film-details.model';
import { FilmService } from 'app/services/tmdb/film-service';
import { RoundRatePipe } from 'app/pipes/round-rate-pipe';
import { FiveStarsRate } from 'app/shared/components/five-stars-rate/five-stars-rate';
import { Button } from 'app/shared/ui/button/button';
import { environment } from 'environments/environment';
import { FilmCarousel } from 'app/shared/components/film-carousel/film-carousel';
import { CarouselFilmData } from 'app/models/film-carousel.model';
import { Subscription } from 'rxjs';
import { Input } from "app/shared/ui/input/input";
import { FilmVideosModal } from "./film-videos-modal/film-videos-modal";
import { SearchStateService } from '../search-page/search-state-service';

@Component({
  selector: 'app-film-page',
  imports: [RoundRatePipe, FiveStarsRate, Button, FilmCarousel, Input, FilmVideosModal],
  templateUrl: './film-page.html',
  styleUrl: './film-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmPage implements OnInit {

  // ---------- Injections ----------

  router = inject(Router);
  searchState = inject(SearchStateService);

  private routeSub!: Subscription;

  // ---------- Properties ----------

  filmId = signal<string | null>('');
  filmService = inject(FilmService);
  route = inject(ActivatedRoute);
  filmDetails = signal<FilmDetails | null>(null);
  bgImage = signal<string>('');
  similarFilms = signal<CarouselFilmData[] | null>(null);

  videosModalOpened = signal(false);

  @HostBinding('style.backgroundImage') get hostBackground(): string {
    const url = this.bgImage();
    return url ? `url("${encodeURI(url)}")` : '';
  }

  // ---------- Life cycle ----------

  ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const paramId = params.get('id');
      this.filmId.set(paramId);

      if (paramId) {
        this.filmService.getFilmById(Number(paramId)).subscribe(data => {
          this.filmDetails.set(data);
          console.log(data);
          const bgImage = this.getBgUrl(data.backdrop_path);
          this.bgImage.set(bgImage);
          this.similarFilms.set(this.filterSimilarFilms(data.similar));
        });
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  // ---------- Methods ----------

  openVideosModal() {
    this.videosModalOpened.set(true);
    console.log('Se abre el modal');
  }

  closeVideosModal() {
    this.videosModalOpened.set(false);
  }

  private filterSimilarFilms(similarFilms: Similar): CarouselFilmData[] {
    return similarFilms.results.map((film) => ({
      id: film.id,
      title: film.title,
      poster_path: film.poster_path,
    }));
  }

  private getBgUrl(poster_path: string | null, size: string = 'w1280'): string {
    if (!poster_path) {
      return 'assets/images/no-bg_path.png';
    } else {
      return `${environment.tmdbImageBaseUrl}${size}${poster_path}`;
    }
  }

  searchByNameFromFilm(){
    this.searchState.searchByName();
    this.router.navigate(['search']);
  }

}
