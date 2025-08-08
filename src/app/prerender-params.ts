import { inject } from '@angular/core';
import { PopularFilmsService } from './services/tmdb/popular-films-service';

export async function getPrerenderParams() {
    const popularFilmsService = inject(PopularFilmsService);
    const ids = await popularFilmsService.getPopularIds();
    return ids.map(id => ({ id }));
}