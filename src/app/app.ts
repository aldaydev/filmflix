import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { Footer } from "./layout/footer/footer";
import { ThemeService } from './services/theme-service/theme-service';
import { SearchStateService } from './pages/search-page/search-state-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: []
})
export class App {
  protected themeService = inject(ThemeService);
}
