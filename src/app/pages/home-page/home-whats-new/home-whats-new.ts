import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from "app/shared/ui/button/button";

@Component({
  selector: 'app-home-whats-new',
  imports: [Button],
  templateUrl: './home-whats-new.html',
  styleUrl: './home-whats-new.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeWhatsNew {

  router = inject(Router);

  goToUpcoming(){
    console.log('Debería navegar');
    this.router.navigateByUrl('/upcoming');
  }

}
