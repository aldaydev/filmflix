import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmDetails } from 'app/models/film-details.model';
import { FilmService } from 'app/services/tmdb/film-service';
import { FilmPageHero } from "./film-page-hero/film-page-hero";

@Component({
  selector: 'app-film-page',
  imports: [FilmPageHero],
  templateUrl: './film-page.html',
  styleUrl: './film-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmPage implements OnInit{

  filmId = signal<string | null>("");
  filmService = inject(FilmService);
  route = inject(ActivatedRoute);
  filmDetails = signal<FilmDetails | null>(null);

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.filmId.set(paramId);

    this.filmService.getFilmById(Number(paramId))
      .subscribe((data) => {
        this.filmDetails.set(data);
      })
  }
}
