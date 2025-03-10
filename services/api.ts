export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_TV_API_KEY,
  headers: {
    accept: "application/json",
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

// const url = 'https://api.themoviedb.org/3/account/21870676/watchlist/tv?language=en-US&page=1&sort_by=created_at.asc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmFhZThjZjMyZmUzMzc0Nzk0MzBjY2E1YjM2MzZmMCIsIm5iZiI6MTc0MTU3NzExNC4wMTksInN1YiI6IjY3Y2U1YjlhYWQ0ODZiNDNlYmUyZjUyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fRr8autO39X9AwYnaorewGTwsAJsQGd_qrei_jDWVE0'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));
