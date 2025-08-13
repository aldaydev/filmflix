import { AfterViewInit, ChangeDetectionStrategy, Component, effect, ElementRef, HostListener, inject, PLATFORM_ID, signal, ViewChild } from '@angular/core';
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

  isOpen = signal(false);

  // ---------- Viewers ----------

  @ViewChild('searcherExpander') searcherExpander!: ElementRef<HTMLButtonElement>;
  searchExpanderHeight = signal(50);
  private searchExpanderInitialHeight: number = 50;

  // --------- Host Listeners ---------

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent){
    if(this.isBrowser){
      if (!this.elRef.nativeElement.contains(event.target)) {
        this.searchExpanderHeight.set(this.searchExpanderInitialHeight);
        this.isOpen.set(false);
      }
    }
  }

  @HostListener('window:resize')
  onResize() {
    if(this.isBrowser){
      this.searchExpanderHeight.set(this.searchExpanderInitialHeight);
      this.isOpen.set(false);
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

}
