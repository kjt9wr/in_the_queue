import apicalypse, { ApicalypseConfig } from "apicalypse";

const requestOptions: ApicalypseConfig = {
  method: "post", // The default is `get`
  baseURL: "https://api.igdb.com/v4",
  headers: {
    "Client-ID": process.env.EXPO_PUBLIC_IGDB_CLIENT_ID,
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_ACCESS_TOKEN}`,
  },
};

export const fetchGameDetails = async (game_id: number) => {
  try {
    const response = await apicalypse(requestOptions)
      .fields("name, platforms, summary, rating, first_release_date")
      .limit(1)
      .where(`id = ${game_id}`)
      .request("/games");

    return await response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCoverArt = async (game_ids: number[]) => {
  try {
    const response = await apicalypse(requestOptions)
      .fields("game, url")
      .limit(15)
      .where(`game = (${game_ids})`)
      .request("/covers");

    return await response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchGamesDetails = async (game_ids: number[]) => {
  try {
    const response = await apicalypse(requestOptions)
      .fields("first_release_date")
      .limit(100)
      .where(`id = (${game_ids})`)
      .request("/games");
    return await response.data;
  } catch (error) {
    console.error(error);
  }
};

export const queryForGames = async (searchTerm: string) => {
  try {
    const response = await apicalypse(requestOptions)
      .fields("name, id")
      .limit(15)
      .search(searchTerm)
      .request("/games");
    return await response.data;
  } catch (error) {
    console.error(error);
  }
};
