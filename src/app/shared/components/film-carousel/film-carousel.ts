import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
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
  filmList = input<Film[] | null>(null);

  onStart = signal(true);
  onEnd = signal(false);

  @ViewChild('innerContainer')
  innerContainer!: ElementRef<HTMLDivElement>;

  @ViewChild('carouselButtonLeft')
  carouselButtonLeft!: ElementRef<HTMLDivElement>;

  slideLeft() {
    const el = this.innerContainer.nativeElement;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    this.innerContainer.nativeElement.scrollBy({
      left: 500,
      behavior: 'smooth',
    });

    // this.innerContainer.nativeElement.addEventListener(
    //   'scroll',
    //   () => {
    //     if (el.scrollLeft > 0) {
    //       this.onStart.set(false);
    //       console.log('adsadasdasd')
    //     } 
    //     if (el.scrollLeft +1 >= maxScrollLeft){
    //       console.log('3424234324')
    //       this.onEnd.set(true);
    //     } 
    //   }
    // );

    let timeout: any;

    this.innerContainer.nativeElement.addEventListener('scroll', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (el.scrollLeft > 0) {
          this.onStart.set(false);
          console.log('adsadasdasd')
        } 
        if (el.scrollLeft +1 >= maxScrollLeft){
          console.log('3424234324')
          this.onEnd.set(true);
        } 
      }, 100);
    });
  }

  slideRight() {
    const el = this.innerContainer.nativeElement;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    this.innerContainer.nativeElement.scrollBy({
      left: -500,
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
