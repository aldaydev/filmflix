import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'environments/environment';

@Pipe({
  name: 'posterUrl'
})
export class PosterUrlPipe implements PipeTransform {

  transform(poster_path: string | null, size: string = 'w342'): string {
    if(!poster_path){
      return "assets/images/no-poster_path.png"
    }else{
      return `${environment.tmdbImageBaseUrl}${size}${poster_path}`
    }
  }

}
