import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  
  // ---------- Properties ----------

  width = signal<number | null>(null);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // ---------- Life cycle ----------

  constructor() {
    if(this.isBrowser){
      this.width.set(window.innerWidth);
      window.addEventListener('resize', () => {
        this.width.set(window.innerWidth);
      });
    }
  }
}
