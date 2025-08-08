import { RenderMode, ServerRoute } from '@angular/ssr';
import { getPrerenderParams } from './prerender-params';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'film/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams
  },

];
