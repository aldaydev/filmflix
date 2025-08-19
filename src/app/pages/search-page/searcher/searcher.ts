import { AfterViewInit, ChangeDetectionStrategy, Component, effect, ElementRef, HostListener, inject, PLATFORM_ID, signal, untracked, ViewChild } from '@angular/core';
import { SearchByTitle } from "./search-by-title/search-by-title";
import { isPlatformBrowser } from '@angular/common';
import { SearchByFilters } from "./search-by-filters/search-by-filters";
import { SearchStateService } from '../search-state-service';
import { ThemeService } from 'app/services/theme-service/theme-service';

@Component({
  selector: 'app-searcher',
  imports: [SearchByTitle, SearchByFilters],
  templateUrl: './searcher.html',
  styleUrl: './searcher.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Searcher implements AfterViewInit{

  // ---------- Injects ----------

  themeService = inject(ThemeService);
  elRef = inject(ElementRef);
  searchStateService = inject(SearchStateService);
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // ---------- Properties ----------

  private lastWidth = this.isBrowser ? window.innerWidth : 0;

  isOpen = signal(false);

  // ---------- Viewers ----------

  @ViewChild('searcherExpander') searcherExpander!: ElementRef<HTMLElement>;
  searchExpanderHeight = signal(50);
  private searchExpanderInitialHeight: number = 50;

  @ViewChild('searcherExpanderButton') searcherExpanderButton!: ElementRef<HTMLButtonElement>;

  // --------- Host Listeners ---------

  constructor() {
    effect(() => {
      this.searchStateService.filmList();
      if(this.isBrowser){
        if (this.isBrowser) {
          untracked(() => this.resetByListUpdate());
        }
      }
    })
  }

  resetByListUpdate(){
    if(this.searcherExpander){
      this.isOpen() && this.closeSearchExpander();
    }
  }



  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent){
    if(this.isBrowser){
      if (!this.elRef.nativeElement.contains(event.target) && this.isOpen()) {
        this.searchExpanderHeight.set(this.searchExpanderInitialHeight);
        this.closeSearchExpander();
      }
    }
  }

  @HostListener('document:focusin', ['$event'])
  onFocusIn(event: FocusEvent) {
    const target = event.target as HTMLElement;
    if (!this.elRef.nativeElement.contains(target) && this.isOpen()) {
      this.closeSearchExpander();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if(this.isBrowser){

      const currentWidth = window.innerWidth;

      if (currentWidth !== this.lastWidth) {
        this.searchExpanderHeight.set(this.searchExpanderInitialHeight);
        this.closeSearchExpander();
      }

      this.lastWidth = currentWidth;
      
    }
  }


  @HostListener('window:scroll')
  onSroll() {
    if(this.isBrowser){
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
      this.searchExpanderHeight.set(this.searchExpanderInitialHeight);
      this.closeSearchExpander();
    }
  }


  // --------- Life cycle ---------

  ngAfterViewInit() {
    if(this.isBrowser){
      this.searchExpanderHeight.set(this.searcherExpander.nativeElement.offsetHeight);
    }
    
  }

  // --------- Methods ---------

  toggleSearchExpander(){
    if(this.isOpen()){
      this.searchExpanderHeight.set(this.searchExpanderInitialHeight);
      this.isOpen.set(false);
    }else{
      this.searchExpanderHeight.set(this.searcherExpander.nativeElement.scrollHeight);
      this.isOpen.set(true);
    }
  }

  closeSearchExpander(){
    if(this.isOpen()){
      this.searcherExpanderButton.nativeElement.focus();
      this.searchExpanderHeight.set(this.searchExpanderInitialHeight);
      this.isOpen.set(false);
    }
  }

}
