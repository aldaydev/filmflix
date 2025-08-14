import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderThemeBg } from 'app/directives';
import { ToggleTheme } from 'app/shared/ui/toggle-theme/toggle-theme';
import { Button } from "app/shared/ui/button/button";
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

  @ViewChild('navbarList') navbarList! : ElementRef<HTMLUListElement>

  @HostListener('window.scroll')

  @HostListener('window:resize')
  onResize() {
    if(this.isBrowser){
      this.isOpen.set(false);
      this.navbarListOpenedHeight.set(this.navbarList.nativeElement.offsetHeight.toString());
    }
  }

  ngAfterViewInit() {
    if(this.isBrowser){
      this.navbarListOpenedHeight.set(this.navbarList.nativeElement.offsetHeight.toString());
      console.log('Desde Init',this.navbarList.nativeElement.offsetHeight.toString());
      this.navbarList.nativeElement.style.height = "0px";
      this.navbarList.nativeElement.style.padding = "0px";
    }
  }

  navToggle(){
    if(this.isOpen()){
      console.log('Cerrar');
      this.isOpen.set(false);
      this.navbarList.nativeElement.style.height = "0px";
      this.navbarList.nativeElement.style.padding = "0px";
    }else{
      console.log('Abrir')
      this.isOpen.set(true);
      this.navbarList.nativeElement.style.height = this.navbarListOpenedHeight() + "px";
      console.log(this.navbarListOpenedHeight() + "px");
      this.navbarList.nativeElement.style.padding = "30px";
    }
  }
}
