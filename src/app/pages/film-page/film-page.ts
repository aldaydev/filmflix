import { ChangeDetectionStrategy, Component, HostBinding, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmDetails } from 'app/models/film-details.model';
import { FilmService } from 'app/services/tmdb/film-service';
import { RoundRatePipe } from 'app/pipes/round-rate-pipe';
import { FiveStarsRate } from 'app/shared/components/five-stars-rate/five-stars-rate';
import { Button } from 'app/shared/ui/button/button';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-film-page',
  imports: [RoundRatePipe, FiveStarsRate, Button],
  templateUrl: './film-page.html',
  styleUrl: './film-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmPage implements OnInit{

  filmId = signal<string | null>("");
  filmService = inject(FilmService);
  route = inject(ActivatedRoute);
  filmDetails = signal<FilmDetails | null>(null);
  bgImage = signal<string >("");

  @HostBinding('style.backgroundImage') get hostBackground() : string { 
    const url = this.bgImage();
    return url ? `url("${encodeURI(url)}")` : "";
  }

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.filmId.set(paramId);

    this.filmService.getFilmById(Number(paramId))
      .subscribe((data) => {
        console.log(data);
        this.filmDetails.set(data);
        const bgImage = this.getBgUrl(data.backdrop_path);
        this.bgImage.set(bgImage)
        // console.log(data.similar);
      })
  }

  private getBgUrl (poster_path : string | null, size: string = "w1280") : string {
    if (!poster_path) {
          return 'assets/images/no-bg_path.png';
        } else {
          return `${environment.tmdbImageBaseUrl}${size}${poster_path}`;
        }
  }

}
