import { RenderMode, ServerRoute } from '@angular/ssr';
import { getPrerenderParams } from './prerender-params';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'film/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams
  },
  {
    path: 'search',
    renderMode: RenderMode.Server
  },
  {
    path: 'upcoming',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'now-playing',
    renderMode: RenderMode.Prerender
  },

];
