import { FilmListItem } from "./popular-film.model";


export interface UpcomingFilms {
    dates:         UpcomingDates;
    page:          number;
    results:       FilmListItem[];
    total_pages:   number;
    total_results: number;
}

export interface UpcomingDates {
    maximum: string;
    minimum: string;
}