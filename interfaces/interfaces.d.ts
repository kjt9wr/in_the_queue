interface TVShow {
  id: number;
  name: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  next_episode_to_air?: {
    air_date: string;
    episode_number: number;
  };
  last_air_date: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  status: string;
  party: string;
  viewing_status: string;
}

interface Movie {
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  party: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  release_status: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: false;
  viewing_status: string;
  vote_average: number;
  vote_count: number;
}

interface VideoGame {
  age_ratings: number[];
  aggregated_rating: number;
  aggregated_rating_count: number;
  alternative_names: number[];
  artworks: number[];
  bundles: number[];
  category: number;
  collections: number[];
  cover: number;
  created_at: number;
  external_games: number[];
  first_release_date: number;
  game_engines: number[];
  game_modes: number[];
  game_type: number;
  genres: number[];
  hypes: number;
  id: number;
  involved_companies: number[];
  language_supports: number[];
  multiplayer_modes: number[];
  name: string;
  platforms: number[];
  player_perspectives: number[];
  rating: number;
  rating_count: number;
  release_dates: number[];
  screenshots: number[];
  similar_games: number[];
  slug: string;
  summary: string;
  tags: number[];
  themes: number[];
  total_rating: number;
  total_rating_count: number;
  updated_at: number;
  url: string;
  videos: number[];
  websites: number[];
  poster_path: string;
  first_release_date: number;
  play_status: string;
}

interface ShowFromDB {
  name: string;
  Release_Status: string;
  Party: string;
  Viewing_Status: string;
  TMDB_ID: number;
  poster_path?: string;
}

interface MovieFromDB {
  name: string;
  release_status: string;
  party: string;
  viewing_status: string;
  TMDB_ID: number;
  poster_path?: string;
}

interface VideoGameFromDB {
  name: string;
  release_status: string;
  party: string;
  play_status: string;
  IGDB_ID: number;
  poster_path?: string;
  owned: boolean;
}
