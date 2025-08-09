import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-faq-expander',
  imports: [],
  templateUrl: './faq-expander.html',
  styleUrl: './faq-expander.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqExpander implements AfterViewInit {

  title = input();
  description = input();
  @Input() isOpen = false;
  @Output() toggle = new EventEmitter<void>();

  @ViewChild('expandableItem') expandableItem!: ElementRef<HTMLDivElement>;
  expandableHeight = signal(0);

  @HostListener('window:resize')
  onResize() {
    this.expandableHeight.set(this.expandableItem.nativeElement.offsetHeight);
  }

  ngAfterViewInit() {
    // Mide el contenido con padding ya aplicado
    this.expandableHeight.set(this.expandableItem.nativeElement.offsetHeight);
  }

  

  onClick() {
    this.toggle.emit();
    if(this.isOpen){
        this.expandableHeight.set(0);
        // this.expandableItem.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }else{
      this.expandableHeight.set(this.expandableItem.nativeElement.scrollHeight);
    }
  }

}
