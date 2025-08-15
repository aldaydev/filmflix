import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, OnInit, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HeaderThemeBg } from 'app/directives';
import { ToggleTheme } from 'app/shared/ui/toggle-theme/toggle-theme';
import { ScreenSizeService } from 'app/services/screen-size-service/screen-size-service';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [ToggleTheme, RouterModule, HeaderThemeBg],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header implements AfterViewInit, OnInit {

  // ---------- Injections ----------

  private router = inject(Router);
  screenSize = inject(ScreenSizeService);
  private sub: Subscription = new Subscription;

  // ---------- Properties ----------
  
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  isCollapsed = signal<boolean>(false);
  isOpen = signal<boolean>(false);

  @ViewChild('navbar') navbar! : ElementRef<HTMLUListElement>

  // ---------- Life cycle ----------

  ngAfterViewInit() {
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

  ngOnInit(): void {
    this.sub = this.router.events.subscribe(event => {
        if(event instanceof NavigationEnd) {
          if(this.isOpen()) {
            this.closeNav();
          }
        }
      })
  }

  // ---------- Methos ----------

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
    if(this.isCollapsed()){
      this.isOpen.set(false);
      this.navbar.nativeElement.style.height === '100%'
        ? this.navbar.nativeElement.style.transition = 'none'
        : this.navbar.nativeElement.style.transition = 'height .3s ease-in, opacity .3s .2s ease-in';
      this.navbar.nativeElement.style.height = "0px";
      this.navbar.nativeElement.style.opacity = "0";
    }
    
  }

  openNav(){
    this.navbar.nativeElement.style.opacity = "1";
    if(this.isCollapsed()){
      this.navbar.nativeElement.style.height = "340px";
      this.navbar.nativeElement.style.transition = 'height .3s .3s ease-in, opacity .5s ease-in, background .5s ease-in-out';
      
    }else{
      this.navbar.nativeElement.style.height = "100%";
      this.navbar.nativeElement.style.transition = 'none';
    }
    this.isOpen.set(true);
      
  }

  // ---------- Host Listeners ----------

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

  @HostListener('window:scroll', [])
  onScroll(){
    if(this.isBrowser){
      if(this.isCollapsed()){
        this.closeNav();
      }
    }
  }

}
