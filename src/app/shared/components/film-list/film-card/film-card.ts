import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Genre } from 'app/models/genre-list.model';
import { SearchStateService } from 'app/pages/search-page/search-state-service';
import { FiveStarsRate } from '../../five-stars-rate/five-stars-rate';
import { RoundRatePipe } from 'app/pipes/round-rate-pipe';
import { Spinner } from "../../spinner/spinner";

@Component({
  selector: 'app-film-card',
  imports: [RouterModule, FiveStarsRate, RoundRatePipe, Spinner],
  templateUrl: './film-card.html',
  styleUrl: './film-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCard {

  // ---------- Injections ----------

  searchState = inject(SearchStateService);
  router = inject(Router);

  // ---------- Properties ----------

  vote_average = input<number>(0);
  image = input<string>('');
  title = input<string>('');
  date = input<string>('');
  id = input<number>();
  loading = input<boolean>(true);

  genres = input<Genre[], number[]>([], {
    transform: (genreIds: number[]) => {
      return genreIds
        .map((genreId) =>
          this.searchState
            .genreList()
            .find((genreObj) => genreObj.id === genreId)
        )
        .filter((g): g is Genre => g !== undefined);
    },
  });


}
