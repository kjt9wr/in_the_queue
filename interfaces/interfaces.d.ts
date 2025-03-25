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
