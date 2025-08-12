import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Genre } from 'app/models/genre-list.model';
import { GenreService } from 'app/services/tmdb/genre-service';
import { SearchStateService } from '../../search-state-service';

@Component({
  selector: 'app-film-card',
  imports: [],
  templateUrl: './film-card.html',
  styleUrl: './film-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCard {
  searchState = inject(SearchStateService);

  image = input<string>('');
  title = input<string>('');
  date = input<string>('');
  genres = input<Genre[], number[]>(
    [],
    {
      transform: (genreIds: number[]) => {
        return genreIds
          .map((genreId) =>
            this.searchState
              .genreList()
              .find((genreObj) => genreObj.id === genreId)
          )
          .filter((g): g is Genre => g !== undefined);
      },
    }
  );
}
