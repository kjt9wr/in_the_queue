import { Query } from "react-native-appwrite";
import { getMoviesFromDB, getShowsFromDB } from "./appwrite";
import { MOVIE_RELEASE_STATUS } from "@/constants/enums";

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
    Query.equal("Viewing_Status", ["Caught_Up"]),
  ];
  return fetchDetailedShows(comingSoonQueries);
};

export const fetchComingSoonMoviesDetails = async () => {
  const comingSoonQueries = [Query.equal("release_status", ["upcoming"])];
  return fetchDetailedMovies(comingSoonQueries);
};

export const fetchShowsintheQueue = async () => {
  const queueQuery = [Query.equal("Viewing_Status", ["Queue"])];
  return await getShowsFromDB(queueQuery);
};

export const fetchMoviesintheQueue = async () => {
  const queueQuery = [
    Query.equal("release_status", [MOVIE_RELEASE_STATUS.RELEASED]),
    Query.equal("viewing_status", ["Queue"]),
  ];
  return await getMoviesFromDB(queueQuery);
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

export const fetchFinishedShows = async () => {
  const finishedQuery = [
    Query.equal("Release_Status", ["Finished"]),
    Query.equal("Viewing_Status", ["Caught_Up"]),
  ];
  return fetchDetailedShows(finishedQuery);
};

export const fetchWatchedMovies = async () => {
  const watchedQuery = [Query.equal("viewing_status", ["Watched"])];
  return fetchDetailedMovies(watchedQuery);
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
