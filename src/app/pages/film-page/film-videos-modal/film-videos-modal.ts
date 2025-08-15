import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoResult } from 'app/models/film-details.model';

@Component({
  selector: 'app-film-videos-modal',
  imports: [],
  templateUrl: './film-videos-modal.html',
  styleUrl: './film-videos-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmVideosModal {

  // ---------- Injections ----------

  sanitizer = inject(DomSanitizer);

  // ---------- Properties ----------

  isOpen = input(false);
  closeModal = output<void>();

  videoData = input<VideoResult | null >(null);
  safeUrl = signal<SafeResourceUrl | null>(null);

  // ---------- Life Cycle ----------

  constructor() {
    effect(() => {
      const video = this.videoData();
      if (video) {
        this.safeUrl.set(
          this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${video.key}?autoplay=1&rel=0&modestbranding=1`
          )
        );
      } else {
        this.safeUrl.set(null);
      }
    });
  }

  // ---------- Methods ----------

  handleClose(){
    this.closeModal.emit();
  }

}
