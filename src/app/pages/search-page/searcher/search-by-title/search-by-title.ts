import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Input } from "app/shared/ui/input/input";
import { Button } from "app/shared/ui/button/button";
import { SearchStateService } from '../../search-state-service';

@Component({
  selector: 'app-search-by-title',
  imports: [Input, Button],
  templateUrl: './search-by-title.html',
  styleUrl: './search-by-title.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchByTitle {
  searchState = inject(SearchStateService);

  isOpen = input<boolean>(false);
}
