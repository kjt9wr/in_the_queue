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
      .fields("*")
      .limit(10)
      .where(`id = ${game_id}`)
      .request("/games");

    return await response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCoverArt = async (cover_id: number) => {
  try {
    const response = await apicalypse(requestOptions)
      .fields("game, url")
      .limit(10)
      .where(`id = ${cover_id}`)
      .request("/covers");

    return await response.data;
  } catch (error) {
    console.error(error);
  }
};
