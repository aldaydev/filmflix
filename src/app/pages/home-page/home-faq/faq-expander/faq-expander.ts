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

  // ---------- Properties ----------

  title = input();
  description = input<string>('');
  @Input() isOpen = false;
  @Output() toggle = new EventEmitter<void>();

  @ViewChild('expandableItem') expandableItem!: ElementRef<HTMLDivElement>;
  expandableHeight = signal(0);

  // ---------- Life cycle ----------

  ngAfterViewInit() {
    this.expandableHeight.set(this.expandableItem.nativeElement.offsetHeight);
  }

  // ---------- Host listeners ----------

  @HostListener('window:resize')
  onResize() {
    this.expandableHeight.set(this.expandableItem.nativeElement.offsetHeight);
  }

  // ---------- Methods ----------

  onClick() {
    this.toggle.emit();
    if(this.isOpen){
        this.expandableHeight.set(0);
    }else{
      this.expandableHeight.set(this.expandableItem.nativeElement.scrollHeight);
    }
  }

}
