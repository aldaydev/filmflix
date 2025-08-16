import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FaqExpander } from "./faq-expander/faq-expander";
import { faqData } from './faq-data';

@Component({
  selector: 'app-home-faq',
  imports: [FaqExpander],
  templateUrl: './home-faq.html',
  styleUrl: './home-faq.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeFaq {

  // ---------- Properties ----------

  faqs = signal(faqData);

  // ---------- Methods ----------

  toggle(index: number){
    if(this.faqs()[index].isOpen){
        this.faqs()[index].isOpen = false;
    }else {
      this.faqs().forEach((faq, i) => faq.isOpen = i === index);
    }
  }


}
