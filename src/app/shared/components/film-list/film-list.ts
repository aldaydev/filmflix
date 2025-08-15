import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-film-list',
  imports: [],
  templateUrl: './film-list.html',
  styleUrl: './film-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmList {

}
