import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'environments/environment';

@Pipe({
  name: 'filmBgUrl',
})
export class FilmBgUrlPipe implements PipeTransform {
  transform(poster_path: string | null, size: string = 'w1280'): string {
    if (!poster_path) {
      return 'assets/images/no-poster_path.png';
    } else {
      return `${environment.tmdbImageBaseUrl}${size}${poster_path}`;
    }
  }
}
