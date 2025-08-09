import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, PLATFORM_ID, QueryList, signal, ViewChildren } from '@angular/core';
import { FaqExpander } from "./faq-expander/faq-expander";
import { isPlatformBrowser } from '@angular/common';
import { single } from 'rxjs';
import { faqData } from './faq-data';

@Component({
  selector: 'app-home-faq',
  imports: [FaqExpander],
  templateUrl: './home-faq.html',
  styleUrl: './home-faq.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeFaq {

  faqs = signal(faqData);

  toggle(index: number){
    console.log('asdsadsad');
    if(this.faqs()[index].isOpen){
        this.faqs()[index].isOpen = false;
    }else {
      this.faqs().forEach((faq, i) => faq.isOpen = i === index);
    }
  }


}
