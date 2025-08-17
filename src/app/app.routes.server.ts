import { RenderMode, ServerRoute } from '@angular/ssr';
import { getPrerenderParams } from './prerender-params';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: '',
    renderMode: RenderMode.Server
  },
  {
    path: 'film/:id',
    renderMode: RenderMode.Server,
    // getPrerenderParams
  },
  {
    path: 'search',
    renderMode: RenderMode.Server
  },
  {
    path: 'upcoming',
    renderMode: RenderMode.Server
  },
  {
    path: 'now-playing',
    renderMode: RenderMode.Server
  },

];
