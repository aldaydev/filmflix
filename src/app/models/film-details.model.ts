export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    iso_639_1: string;
    name: string;
    english_name?: string; // en algunas respuestas aparece este campo
}

export interface Collection {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
}

export interface VideoResult {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string; // Youtube video key
    published_at: string; // fecha en string ISO
    site: string; // Ej: "YouTube"
    size: number; // calidad (por ejemplo 480, 720)
    type: string; // Ej: "Trailer", "Teaser", "Clip"
    official: boolean;
    id: string;
}

export interface Videos {
    results: VideoResult[];
}

export interface SimilarFilmResult {
    adult: boolean;
    backdrop_path: string | null;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    media_type?: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Similar {
    page: number;
    results: SimilarFilmResult[];
    total_pages: number;
    total_results: number;
}

export interface FilmDetails {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: Collection | null;
    budget: number;
    genres: Genre[];
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number | null;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    videos: Videos;
    similar: Similar;
}
