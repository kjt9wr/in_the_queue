//TODO Update these

interface TVShow {
  id: number;
  name: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  next_episode_to_air?: {
    air_date: string;
  };
  last_air_date: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  status: string;
  party: string;
  viewing_status: string;
}

interface ShowFromDB {
  Name: string;
  Release_Status: string;
  Party: string;
  Viewing_Status: string;
  TMDB_ID: number;
}

interface TrendingCardProps {
  tvShow: TVShow;
}
