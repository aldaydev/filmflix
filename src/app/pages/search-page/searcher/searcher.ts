import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { SearchByTitle } from "./search-by-title/search-by-title";
import { isPlatformBrowser } from '@angular/common';
import { SearchByFilters } from "./search-by-filters/search-by-filters";

@Component({
  selector: 'app-searcher',
  imports: [SearchByTitle, SearchByFilters],
  templateUrl: './searcher.html',
  styleUrl: './searcher.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Searcher implements AfterViewInit{

  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  isOpen = signal(false);
  hasOptions = signal<'Nombre' | 'Filtros' | null>(null);

  @ViewChild('searcherExpander') searcherExpander!: ElementRef<HTMLButtonElement>;
  searchExpanderHeight = signal(50);

  @HostListener('window:resize')
  onResize() {
    if(this.isBrowser){
      this.searchExpanderHeight.set(this.searcherExpander.nativeElement.offsetHeight);
    }
  }

  ngAfterViewInit() {
    if(this.isBrowser){
      this.searchExpanderHeight.set(this.searcherExpander.nativeElement.offsetHeight);
      console.log(this.isOpen());
      console.log(this.searchExpanderHeight());
    }
    
  }

  toggleSearchExpander(){
    if(this.isOpen()){
      console.log(50);
      this.searchExpanderHeight.set(50);
      this.isOpen.set(false);
    }else{
      this.searchExpanderHeight.set(this.searcherExpander.nativeElement.scrollHeight);
      console.log(this.searcherExpander.nativeElement.scrollHeight);
      this.isOpen.set(true);
    }
  }

}
