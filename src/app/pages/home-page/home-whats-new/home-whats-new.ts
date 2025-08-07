import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from "app/shared/ui/button/button";

@Component({
  selector: 'app-home-whats-new',
  imports: [Button],
  templateUrl: './home-whats-new.html',
  styleUrl: './home-whats-new.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeWhatsNew {

}
