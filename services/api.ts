export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
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

export const addToWatchList = async (showId: number, isAdding: boolean) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/account/${process.env.EXPO_PUBLIC_ACCOUNT_ID}/watchlist`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: TMDB_CONFIG.headers,
    body: JSON.stringify({
      media_type: "tv",
      media_id: showId,
      watchlist: isAdding,
    }),
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to add show to list", response.statusText);
  }
  const data = await response.json();

  return data.results;
};
