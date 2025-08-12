import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Genre } from 'app/models/genre-list.model';
import { GenreService } from 'app/services/tmdb/genre-service';
import { SearchStateService } from '../../search-state-service';
import { RouterModule } from '@angular/router';
import { FiveStarsRate } from "app/shared/components/five-stars-rate/five-stars-rate";
import { RoundRatePipe } from 'app/pipes/round-rate-pipe';

@Component({
  selector: 'app-film-card',
  imports: [RouterModule, FiveStarsRate, RoundRatePipe],
  templateUrl: './film-card.html',
  styleUrl: './film-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCard {
  searchState = inject(SearchStateService);

  vote_average = input<number>(0);
  image = input<string>('');
  title = input<string>('');
  date = input<string>('');
  id = input<number>();
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
