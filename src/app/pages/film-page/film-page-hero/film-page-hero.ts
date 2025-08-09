import { AfterViewInit, ChangeDetectionStrategy, Component, input, OnInit, signal } from '@angular/core';
import { FilmDetails } from 'app/models/film-details.model';
import { FilmBgUrlPipe } from 'app/pipes/bg-url-pipe';
import { PosterUrlPipe } from 'app/pipes/poster-url-pipe';

@Component({
  selector: 'app-film-page-hero',
  imports: [FilmBgUrlPipe],
  templateUrl: './film-page-hero.html',
  styleUrl: './film-page-hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmPageHero implements AfterViewInit{
  filmDetails = input<FilmDetails | null>(null);

  ngAfterViewInit () {
    console.log(this.filmDetails())
  }

}
