import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-film-page',
  imports: [],
  templateUrl: './film-page.html',
  styleUrl: './film-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmPage implements OnInit{

  filmId = signal<string | null>("");

  route = inject(ActivatedRoute);

  ngOnInit() {
    this.filmId.set(this.route.snapshot.paramMap.get('id'));
  }
}
