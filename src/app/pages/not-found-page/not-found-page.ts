import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterModule],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPage implements OnInit{

  private meta = inject(Meta);
  private title = inject(Title);

  ngOnInit(): void {
    this.title.setTitle('Página no encontrada - FilmFlix');
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }

}
