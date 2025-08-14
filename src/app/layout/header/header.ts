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
  onScroll(){
    if(this.isBrowser){
      if(this.isCollapsed()){
        this.closeNav();
      }
    }
  }

  @HostListener('window:resize')
  onResize() {
    if(this.isBrowser){
      if(window.innerWidth >= 1024){
        if(this.isCollapsed()) this.isCollapsed.set(false);
        this.openNav();
      }else{
        this.isCollapsed.set(true);
        this.closeNav();
        
      }
    }
  }

  ngAfterViewInit() {
    if(this.isBrowser){
      console.log('1. Seha cargado la app', window.innerWidth);
      if(window.innerWidth >= 1024){
        this.isCollapsed.set(false);
        this.openNav();
      }else{
        this.isCollapsed.set(true);
        console.log('ESTA LLEGANDO AQUÍ');
        // this.navbarListOpenedHeight.set(this.navbar.nativeElement.offsetHeight.toString());
        this.closeNav();
      }
      
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
    console.log('HEIGHT PREVIO',  this.navbar.nativeElement.style.height);
    this.navbar.nativeElement.style.height === '100%'
      ? this.navbar.nativeElement.style.transition = 'none'
      : this.navbar.nativeElement.style.transition = 'height .3s ease-in, opacity .3s .2s ease-in';
    this.navbar.nativeElement.style.height = "0px";
    this.navbar.nativeElement.style.opacity = "0";
  }

  openNav(){
    this.navbar.nativeElement.style.opacity = "1";
    if(this.isCollapsed()){
      this.navbar.nativeElement.style.height = "340px";
      this.navbar.nativeElement.style.transition = 'height .3s .3s ease-in, opacity .5s ease-in';
      
    }else{
      this.navbar.nativeElement.style.height = "100%";
      this.navbar.nativeElement.style.transition = 'none';
    }
    this.isOpen.set(true);
      
  }
}
