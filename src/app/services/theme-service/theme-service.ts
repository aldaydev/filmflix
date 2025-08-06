import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private preferedUserTheme : boolean = false;
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  public theme = signal<'dark' | 'light'>('light');

  constructor(){
    if(this.isBrowser){
      this.preferedUserTheme = window.matchMedia('(prefers-color-scheme: light)').matches;
      this.theme.set(this.preferedUserTheme ? 'light' : 'dark');

      if(this.theme() === 'light'){
        document.documentElement.classList.add('light');
      }else{
        document.documentElement.classList.remove('light');
      }

      effect(() => {
        const mode = this.theme();
        document.documentElement.classList.toggle('light', mode === 'light');
      })
    }
  }

  toggleTheme(){
    this.theme.set(this.theme() === 'dark' ? 'light' : 'dark');
  }
}
