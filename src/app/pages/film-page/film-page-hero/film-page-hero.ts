import { AfterViewInit, ChangeDetectionStrategy, Component, input, OnInit, signal } from '@angular/core';
import { FilmDetails } from 'app/models/film-details.model';
import { FilmBgUrlPipe } from 'app/pipes/bg-url-pipe';
import { RoundRatePipe } from 'app/pipes/round-rate-pipe';
import { FiveStarsRate } from "app/shared/components/five-stars-rate/five-stars-rate";

@Component({
  selector: 'app-film-page-hero',
  imports: [FilmBgUrlPipe, RoundRatePipe, FiveStarsRate],
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
