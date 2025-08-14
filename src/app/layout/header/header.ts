import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderThemeBg } from 'app/directives';
import { ToggleTheme } from 'app/shared/ui/toggle-theme/toggle-theme';
import { ScreenSizeService } from 'app/services/screen-size-service/screen-size-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ToggleTheme, RouterModule, HeaderThemeBg],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header implements AfterViewInit {
  screenSize = inject(ScreenSizeService);
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  isCollapsed = signal<boolean>(false);
  isOpen = signal<boolean>(false);

  navbarListHeight = signal<number>(0);
  navbarListOpenedHeight = signal<string>("0");

  @ViewChild('navbar') navbar! : ElementRef<HTMLUListElement>

  @HostListener('window.scroll')

  @HostListener('window:resize')
  onResize() {
    if(this.isBrowser){
      this.closeNav();
    }
  }

  ngAfterViewInit() {
    if(this.isBrowser){
      this.navbarListOpenedHeight.set(this.navbar.nativeElement.offsetHeight.toString());
      console.log('Desde Init',this.navbar.nativeElement.offsetHeight.toString());
      this.closeNav();
    }
  }

  navToggle(){
    if(this.isOpen()){
      console.log('Cerrar');
      this.closeNav();
    }else{
      console.log('Abrir')
      this.isOpen.set(true);
      this.openNav();
    }
  }

  closeNav(){
    this.isOpen.set(false);
    this.navbar.nativeElement.style.height = "0px";
    this.navbar.nativeElement.style.opacity = "0";
  }

  openNav(){
    this.isOpen.set(true);
    this.navbar.nativeElement.style.height = this.navbarListOpenedHeight() + "px";
    this.navbar.nativeElement.style.opacity = "1";
    this.navbar.nativeElement.style.transition = 'height .3s ease-in, opacity .3s ease-in';
  }
}
