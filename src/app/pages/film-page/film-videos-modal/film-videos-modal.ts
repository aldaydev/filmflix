import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { VideoResult } from 'app/models/film-details.model';
import { ThemeService } from 'app/services/theme-service/theme-service';

@Component({
  selector: 'app-film-videos-modal',
  imports: [],
  templateUrl: './film-videos-modal.html',
  styleUrl: './film-videos-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmVideosModal {

  isOpen = input(false);
  closeModal = output<void>();

  videos = input<VideoResult[] | null>(null);

  handleClose(){
    this.closeModal.emit();
  }

}
