import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Searcher } from "./searcher/searcher";

@Component({
  selector: 'app-search-page',
  imports: [Searcher],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPage {
  
}
