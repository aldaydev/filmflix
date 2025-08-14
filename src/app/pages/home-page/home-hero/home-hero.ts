import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchStateService } from 'app/pages/search-page/search-state-service';
import { ScreenSizeService } from 'app/services/screen-size-service/screen-size-service';
import { ThemeService } from 'app/services/theme-service/theme-service';
import { Button } from "app/shared/ui/button/button";
import { Input } from "app/shared/ui/input/input";

@Component({
  selector: 'app-home-hero',
  imports: [Button, Input],
  templateUrl: './home-hero.html',
  styleUrl: './home-hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeHero implements OnInit {

  // ---------- Injections ----------

  themeService = inject(ThemeService);
  searchState = inject(SearchStateService);
  screenSize = inject(ScreenSizeService);
  router = inject(Router);

  // ---------- Life cycle ----------

  ngOnInit(): void {
    this.searchState.hasName.set(false);
    this.searchState.selectedName.set('');
  }

  // ---------- Methods ----------

  searchByNameFromHero(){
    this.searchState.searchByName();
    this.router.navigate(['search']);
  }

}
