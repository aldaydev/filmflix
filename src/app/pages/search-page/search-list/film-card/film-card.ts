import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Genre } from 'app/models/genre-list.model';

@Component({
  selector: 'app-film-card',
  imports: [],
  templateUrl: './film-card.html',
  styleUrl: './film-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmCard {
  image = input<string>('');
  title = input<string>('');
  date = input<string>('');
  genres = input<Genre, number[]>(
    {id: 1, name: 'hola'}, // valor inicial ya transformado
    {
      transform: (genreIds: number[]) => {
        return {id: 2, name: 'adios'};
      }
    }
  );


}
