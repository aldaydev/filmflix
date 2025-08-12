import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  
  width = signal<number>(0);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    if(this.isBrowser){
      window.addEventListener('resize', () => {
        this.width.set(window.innerWidth);
      });
    }
  }
}
