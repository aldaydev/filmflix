import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private document = inject(DOCUMENT);

  // ---------- Properties ----------

  private preferedUserTheme : boolean = false;
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  public theme = signal<'dark' | 'light'>('dark');

  // ---------- Life cycle ----------

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
        this.setThemeColor(mode === 'light' ? '#ffffff' : '#000000');
      })
    }
  }

  // ---------- Methods ----------

  toggleTheme(){
    this.theme.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  // Método para actualizar el theme en meta tags
  private setThemeColor(color: string) {
    let themeMeta = this.document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute('content', color);
    }
  }

}
