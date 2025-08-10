import { ChangeDetectionStrategy, Component, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { StarRate } from "../star-rate/star-rate";

@Component({
  selector: 'app-five-stars-rate',
  imports: [StarRate],
  templateUrl: './five-stars-rate.html',
  styleUrl: './five-stars-rate.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiveStarsRate implements OnInit, OnChanges {
  vote_average = input(0);
  starsPercentage = signal<number[]>([]);

  ngOnInit(): void {
    
    this.updateStars(this.vote_average());
    // let translateAverage = this.vote_average() / 2;
    // let starsArr = [];

    // for (let i = 1; i <= 5; i++) {
    //   if(translateAverage >= 1){
    //     starsArr.push(100);
    //     translateAverage --;
    //   }else if(translateAverage < 1 && translateAverage > 0){
    //     starsArr.push(Math.floor(translateAverage * 100));
    //     translateAverage = 0;
    //   }else {
    //     starsArr.push(0);
    //   }
    // }

    // this.starsPercentage.set(starsArr);
  }

  private updateStars (value: number ) {
    let translateAverage = value / 2;
    let starsArr = [];

    for (let i = 1; i <= 5; i++) {
      if(translateAverage >= 1){
        starsArr.push(100);
        translateAverage --;
      }else if(translateAverage < 1 && translateAverage > 0){
        starsArr.push(Math.floor(translateAverage * 100));
        translateAverage = 0;
      }else {
        starsArr.push(0);
      }
    }

    this.starsPercentage.set(starsArr);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['vote_average']) {
      this.updateStars(changes['vote_average'].currentValue);
    }
  }

}
