import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Input } from "app/shared/ui/input/input";
import { Button } from "app/shared/ui/button/button";

@Component({
  selector: 'app-search-by-title',
  imports: [Input, Button],
  templateUrl: './search-by-title.html',
  styleUrl: './search-by-title.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchByTitle {

}
