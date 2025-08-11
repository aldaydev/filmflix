export interface FilmListItem {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number; // Used in carousel
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null; // Used in carousel
    release_date: string;
    title: string; // Used in carousel
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface FilmListResponse {
    page: number;
    results: FilmListItem[];
    total_pages: number;
    total_results: number;
}


