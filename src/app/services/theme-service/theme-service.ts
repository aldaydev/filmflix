import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

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
    }
  }
}
