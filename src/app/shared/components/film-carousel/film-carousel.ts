import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { Film } from 'app/models/film.model';
import { PosterUrlPipe } from 'app/pipes/poster-url-pipe-pipe';
import { FilmCarouselArrow } from './film-carousel-arrow/film-carousel-arrow';

@Component({
  selector: 'app-film-carousel',
  imports: [PosterUrlPipe, FilmCarouselArrow],
  templateUrl: './film-carousel.html',
  styleUrl: './film-carousel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCarousel {
  @ViewChild('innerContainer') innerContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('posterContainer') posterContainer!: ElementRef<HTMLAnchorElement>;

  filmList = input<Film[] | null>(null);

  onStart = signal(true);
  onEnd = signal(false);

  scroll : number = 0;

  @HostListener('window:resize')
  onResize() {
    this.calculateScroll();
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
    console.log(maxScrollLeft);

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
          console.log('adsadasdasd');
        }
        if (el.scrollLeft + 1 >= maxScrollLeft) {
          console.log('3424234324');
          this.onEnd.set(true);
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
          console.log('aaaaaaa');
        }
        if (el.scrollLeft < maxScrollLeft) {
          this.onEnd.set(false);
          console.log('aaaaaaa');
        }
      }, 100);
    });
  }
}
