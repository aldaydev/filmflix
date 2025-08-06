import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { ThemeService } from './services/theme-service/theme-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  protected theme = inject(ThemeService).theme();

  constructor(){
    if(this.isBrowser){
      if(this.theme === 'dark'){
        document.documentElement.classList.add('light');
      }else{
        document.documentElement.classList.remove('light');
      }
    }
  }

}
