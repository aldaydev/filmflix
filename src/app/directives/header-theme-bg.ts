import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  PLATFORM_ID,
  Renderer2,
  signal,
} from '@angular/core';
import { ThemeService } from 'app/services/theme-service/theme-service';

@Directive({
  selector: '[appHeaderThemeBg]',
})
export class HeaderThemeBg {

  appHeaderThemeBg = input<{isOpen: boolean}>({isOpen: false});

  themeService = inject(ThemeService);
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor(private renderer: Renderer2, private el: ElementRef) {
    if (this.isBrowser) {
      effect(() => {
        this.themeService.theme();
        this.onWindowScroll();

        console.log('ISOPEN FROM HEADER', this.appHeaderThemeBg().isOpen)

        if(this.appHeaderThemeBg().isOpen){
          this.renderer.addClass(this.el.nativeElement, 'bgSolid');
        }
      });
    }

    
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (this.themeService.theme() === 'dark') {
      this.renderer.removeClass(this.el.nativeElement, 'bgGradientLight');
      this.renderer.addClass(this.el.nativeElement, 'bgGradientDark');
    }

    if (this.themeService.theme() === 'light') {
      this.renderer.removeClass(this.el.nativeElement, 'bgGradientDark');
      this.renderer.addClass(this.el.nativeElement, 'bgGradientLight');
    }

    if (scrollTop === 0) {
      this.renderer.removeClass(this.el.nativeElement, 'bgSolid');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'bgSolid');
    }
  }
}
