declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            TMDB_BASE_URL: string;
            TMDB_TOKEN: string;
            TMDB_IMAGE_BASE_URL: string;
        }
    }
}

export {};
