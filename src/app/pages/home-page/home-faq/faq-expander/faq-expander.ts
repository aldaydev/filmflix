import { ChangeDetectionStrategy, Component, EventEmitter, input, Output, output } from '@angular/core';

@Component({
  selector: 'app-faq-expander',
  imports: [],
  templateUrl: './faq-expander.html',
  styleUrl: './faq-expander.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqExpander {
  title = input();
  description = input();
  isOpen = input();
  @Output() toggle = new EventEmitter<void>();

  onClick() {
    this.toggle.emit();
  }

}
