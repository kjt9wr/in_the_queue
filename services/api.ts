import {
  MOVIE_RELEASE_STATUS,
  PLAY_STATUS,
  VIEWING_STATUS,
} from "@/constants/enums";
import { Query } from "react-native-appwrite";
import {
  getMoviesFromDB,
  getShowsFromDB,
  getVideoGamesFromDB,
} from "./appwrite";
import { fetchGameDetails, fetchGamesDetails } from "./igdb";

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  BASE_URL_V4: "https://api.themoviedb.org/4",
  API_KEY: process.env.EXPO_PUBLIC_TV_API_KEY,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TV_API_KEY}`,
  },
};

export const fetchShows = async ({ query }: { query: string }) => {
  const endpoint = `${
    TMDB_CONFIG.BASE_URL
  }/search/tv?query=${encodeURIComponent(query)}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch shows", response.statusText);
  }

  const data = await response.json();
  return data.results;
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = `${
    TMDB_CONFIG.BASE_URL
  }/search/movie?query=${encodeURIComponent(query)}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();
  return data.results;
};

export const fetchComingSoonShowsDetails = async () => {
  const comingSoonQueries = [
    Query.or([
      Query.equal("Release_Status", ["Awaiting"]),
      Query.equal("Release_Status", ["Limbo"]),
    ]),
    Query.equal("Viewing_Status", [VIEWING_STATUS.CAUGHT_UP]),
  ];
  return fetchDetailedShows(comingSoonQueries);
};

export const fetchComingSoonMoviesDetails = async () => {
  const comingSoonQueries = [
    Query.equal("release_status", [MOVIE_RELEASE_STATUS.UPCOMING]),
  ];
  return fetchDetailedMovies(comingSoonQueries);
};

export const fetchComingSoonVideoGamesDetails = async () => {
  const comingSoonQueries = [
    Query.equal("release_status", [MOVIE_RELEASE_STATUS.UPCOMING]),
  ];
  return fetchDetailedVideoGames(comingSoonQueries);
};

export const fetchShowsintheQueue = async () => {
  const queueQuery = [Query.equal("Viewing_Status", [VIEWING_STATUS.QUEUE])];
  return await getShowsFromDB(queueQuery);
};

export const fetchMoviesintheQueue = async () => {
  const queueQuery = [
    Query.equal("release_status", [MOVIE_RELEASE_STATUS.RELEASED]),
    Query.equal("viewing_status", [VIEWING_STATUS.QUEUE]),
  ];
  return await getMoviesFromDB(queueQuery);
};

export const fetchGamesintheQueue = async () => {
  const queueQuery = [
    Query.equal("play_status", [VIEWING_STATUS.QUEUE]),
    Query.equal("release_status", [MOVIE_RELEASE_STATUS.RELEASED]),
  ];
  return await getVideoGamesFromDB(queueQuery);
};

export const fetchWatchingNow = async () => {
  const watchingQuery = [
    Query.or([
      Query.equal("Viewing_Status", ["Currently_Watching"]),
      Query.equal("Viewing_Status", ["Rewatching"]),
    ]),
  ];
  return await getShowsFromDB(watchingQuery);
};

export const fetchPlayingNow = async () => {
  const queueQuery = [
    Query.equal("play_status", [PLAY_STATUS.CURRENTLY_PLAYING]),
  ];
  return await getVideoGamesFromDB(queueQuery);
};

export const fetchFinishedShows = async () => {
  const finishedQuery = [
    Query.equal("Release_Status", ["Finished"]),
    Query.equal("Viewing_Status", ["Caught_Up"]),
  ];
  return fetchDetailedShows(finishedQuery);
};

export const fetchWatchedMovies = async () => {
  const watchedQuery = [
    Query.equal("viewing_status", [VIEWING_STATUS.WATCHED]),
  ];
  return fetchDetailedMovies(watchedQuery);
};

export const fetchFinishedGames = async () => {
  const finishedQuery = [Query.equal("play_status", [PLAY_STATUS.FINISHED])];
  return fetchDetailedVideoGames(finishedQuery);
};

const fetchDetailedShows = async (queries: string[]) => {
  const showsFromDb = await getShowsFromDB(queries);

  const data = showsFromDb
    ? Promise.all(
        showsFromDb.map(async (tvShow: ShowFromDB) => {
          return {
            ...(await (
              await fetch(`${TMDB_CONFIG.BASE_URL}/tv/${tvShow.TMDB_ID}`, {
                method: "GET",
                headers: TMDB_CONFIG.headers,
              })
            ).json()),
            party: tvShow.Party,
            viewing_status: tvShow.Viewing_Status,
          };
        })
      )
    : [];

  return data;
};

const fetchDetailedMovies = async (queries: string[]) => {
  const moviesFromDB = await getMoviesFromDB(queries);

  const data = moviesFromDB
    ? Promise.all(
        moviesFromDB.map(async (movie: MovieFromDB) => {
          return {
            ...(await (
              await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movie.TMDB_ID}`, {
                method: "GET",
                headers: TMDB_CONFIG.headers,
              })
            ).json()),
            party: movie.party,
            viewing_status: movie.viewing_status,
          };
        })
      )
    : [];

  return data;
};

const fetchDetailedVideoGames = async (queries: string[]) => {
  const videoGamesFromDB = await getVideoGamesFromDB(queries);
  if (videoGamesFromDB) {
    const gameIds = videoGamesFromDB.map((game) => game.IGDB_ID);
    const dataFromApi = await fetchGamesDetails(gameIds);
    const dataWithDates = mergeArrays(videoGamesFromDB, dataFromApi);
    return dataWithDates;
  }
};

const mergeArrays = (gamesFromDB: any[], dataFromApi: any[]) => {
  return gamesFromDB.reduce((acc, dbGameData) => {
    let nameWithDate = dataFromApi.find(
      (game) => game.id === dbGameData.IGDB_ID
    );
    acc.push(nameWithDate ? { ...dbGameData, ...nameWithDate } : dbGameData);
    return acc;
  }, []);
};

export const fetchSingleShowDetails = async (showId: string) => {
  const showFromDb = await getShowsFromDB([
    Query.equal("TMDB_ID", [Number(showId)]),
  ]);
  try {
    const response = await fetch(`${TMDB_CONFIG.BASE_URL}/tv/${showId}`, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch show details: ${response.statusText}`);
    }

    let detailedShow = await response.json();

    if (showFromDb && showFromDb.length > 0) {
      detailedShow = { ...detailedShow, ...showFromDb[0] };
    }
    return detailedShow;
  } catch (error) {
    console.error("Error fetching show details:", error);
    throw error;
  }
};

export const fetchSingleMovieDetails = async (movieId: string) => {
  const movieFromDB = await getMoviesFromDB([
    Query.equal("TMDB_ID", [Number(movieId)]),
  ]);
  try {
    const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}`, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    let detailedMovie = await response.json();

    if (movieFromDB && movieFromDB.length > 0) {
      detailedMovie = { ...detailedMovie, ...movieFromDB[0] };
    }
    return detailedMovie;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const fetchSingleVideoGameDetails = async (
  video_game_IGDB_ID: number
) => {
  const movieFromDB = await getVideoGamesFromDB([
    Query.equal("IGDB_ID", [video_game_IGDB_ID]),
  ]);
  try {
    const response = await fetchGameDetails(video_game_IGDB_ID);

    let detailedGame = await response[0];

    if (movieFromDB && movieFromDB.length > 0) {
      detailedGame = { ...detailedGame, ...movieFromDB[0] };
    }
    return detailedGame;
  } catch (error) {
    console.error("Error fetching video game details:", error);
    throw error;
  }
};
