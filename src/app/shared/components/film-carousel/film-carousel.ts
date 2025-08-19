import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { PosterUrlPipe } from 'app/pipes/poster-url-pipe';
import { FilmCarouselArrow } from './film-carousel-arrow/film-carousel-arrow';
import { Router, RouterModule } from '@angular/router';
import { CarouselFilmData } from 'app/models/film-carousel.model';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-film-carousel',
  imports: [PosterUrlPipe, FilmCarouselArrow, RouterModule],
  templateUrl: './film-carousel.html',
  styleUrl: './film-carousel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCarousel {

  router = inject(Router);

  // ---------- Properties ----------

  @ViewChild('innerContainer') innerContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('posterContainer') posterContainer!: ElementRef<HTMLAnchorElement>;

  @ViewChild('slideButtonRight') slideButtonRight!: ElementRef<HTMLButtonElement>;
  @ViewChild('slideButtonLeft') slideButtonLeft!: ElementRef<HTMLButtonElement>;

  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  filmList = input<CarouselFilmData[] | null>(null);
  hasNumber = input<boolean>(false);
  tabindex = input<boolean>(true);

  onStart = signal(true);
  onEnd = signal(false);

  scroll : number = 0;

  titleToShow = signal<string>("");

  // ---------- Host Listeners ----------

  @HostListener('window:resize')
  onResize() {
    this.calculateScroll();
  }

  // ---------- Life Cycle ----------

  constructor() {
    effect(() => {
      if(this.isBrowser && this.filmList()) {
        this.scrollToStart();
      }
    })
  }

  // ---------- Methods ----------

  scrollToStart() {
    if (this.innerContainer) {
      this.innerContainer.nativeElement.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
      this.onStart.set(true);
      this.onEnd.set(false);
      this.scroll = 0;
    }
  }

  showTitle(title : string) {
    this.titleToShow.set(title);
  }

  hideTitle() {
    this.titleToShow.set('');
  }

  calculateScroll() {
    const innerContainerWidth = this.innerContainer.nativeElement.clientWidth;
    const posterWidth = this.posterContainer.nativeElement.clientWidth;
    this.scroll = Math.floor((innerContainerWidth / posterWidth))* posterWidth;
  }

  slideLeft() {
    if(this.scroll === 0) this.calculateScroll();

    const el = this.innerContainer.nativeElement;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    this.innerContainer.nativeElement.scrollBy({
      left: this.scroll,
      behavior: 'smooth',
    });

    let timeout: any;

    this.innerContainer.nativeElement.addEventListener('scroll', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (el.scrollLeft > 0) {
          this.onStart.set(false);
        }
        if (el.scrollLeft + 1 >= maxScrollLeft) {
          this.onEnd.set(true);
          this.slideButtonLeft.nativeElement.focus();
        }
      }, 100);
    });
  }

  slideRight() {
    if(this.scroll === 0) this.calculateScroll();

    const el = this.innerContainer.nativeElement;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    this.innerContainer.nativeElement.scrollBy({
      left: -this.scroll,
      behavior: 'smooth',
    });

    let timeout: any;

    this.innerContainer.nativeElement.addEventListener('scroll', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (el.scrollLeft === 0) {
          this.onStart.set(true);
          this.slideButtonRight.nativeElement.focus();
        }
        if (el.scrollLeft < maxScrollLeft) {
          this.onEnd.set(false);
        }
      }, 100);
    });
  }
}
