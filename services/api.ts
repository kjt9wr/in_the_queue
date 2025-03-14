import { Query } from "react-native-appwrite";
import { getShowsFromDB } from "./appwrite";

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
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/tv?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/account/${process.env.EXPO_PUBLIC_ACCOUNT_ID}/watchlist/tv?language=en-US&page=1&sort_by=created_at.asc`;

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

export const fetchAllShows = async () => {
  const endpoint = `${TMDB_CONFIG.BASE_URL_V4}/list/${process.env.EXPO_PUBLIC_LIST_ID}`;
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

export const addToTMDB = async (
  list: string, // either "watchlist" or "favorite"
  showId: number,
  isAdding: boolean
) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/account/${process.env.EXPO_PUBLIC_ACCOUNT_ID}/${list}`;

  const requestBodyParams =
    list === "watchlist"
      ? {
          watchlist: isAdding,
        }
      : {
          favorite: isAdding,
        };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: TMDB_CONFIG.headers,
    body: JSON.stringify({
      ...requestBodyParams,
      media_type: "tv",
      media_id: showId,
    }),
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to add show to list", response.statusText);
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

export const fetchShowsintheQueue = async () => {
  const queueQuery = [Query.equal("Viewing_Status", ["Queue"])];
  return fetchDetailedShows(queueQuery);
};

export const fetchWatchingNow = async () => {
  const watchingQuery = [
    Query.or([
      Query.equal("Viewing_Status", ["Currently_Watching"]),
      Query.equal("Viewing_Status", ["Rewatching"]),
    ]),
  ];
  return fetchDetailedShows(watchingQuery);
};

export const fetchFinishedShows = async () => {
  const finishedQuery = [
    Query.equal("Release_Status", ["Finished"]),
    Query.equal("Viewing_Status", ["Caught_Up"]),
  ];
  return fetchDetailedShows(finishedQuery);
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
