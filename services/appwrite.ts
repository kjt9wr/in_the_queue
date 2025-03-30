import { MODE } from "@/constants/enums";
import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const COLLECTION_ID_MOVIES =
  process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID_MOVIES!;
const COLLECTION_ID_VIDEO_GAMES =
  process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID_VIDEO_GAMES!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const getShowsFromDB = async (
  queries: string[]
): Promise<ShowFromDB[] | undefined> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      queries
    );

    return result.documents as unknown as ShowFromDB[];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getMoviesFromDB = async (
  queries: string[]
): Promise<MovieFromDB[] | undefined> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MOVIES,
      queries
    );

    return result.documents as unknown as MovieFromDB[];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getVideoGamesFromDB = async (
  queries: string[]
): Promise<VideoGameFromDB[] | undefined> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_VIDEO_GAMES,
      queries
    );

    return result.documents as unknown as VideoGameFromDB[];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const updateShow = async (tvShow: ShowFromDB) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("TMDB_ID", tvShow.TMDB_ID),
    ]);

    // already in DB
    if (result.documents.length > 0) {
      const existingShow = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingShow.$id,
        {
          Party: tvShow.Party,
          Viewing_Status: tvShow.Viewing_Status,
          Release_Status: tvShow.Release_Status,
        }
      );
    } else {
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        tvShow
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateMovie = async (movie: MovieFromDB) => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MOVIES,
      [Query.equal("TMDB_ID", movie.TMDB_ID)]
    );

    // already in DB
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID_MOVIES,
        existingMovie.$id,
        {
          party: movie.party,
          viewing_status: movie.viewing_status,
          release_status: movie.release_status,
        }
      );
    } else {
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID_MOVIES,
        ID.unique(),
        movie
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteFromDB = async (tmdb_id: number, mode: string) => {
  let collection;
  switch (mode) {
    case MODE.TV_SHOWS:
      collection = COLLECTION_ID;
      break;
    case MODE.MOVIES:
      collection = COLLECTION_ID_MOVIES;
      break;
    default:
      collection = COLLECTION_ID;
      break;
  }

  try {
    const showFromDatabase = await database.listDocuments(
      DATABASE_ID,
      collection,
      [Query.equal("TMDB_ID", tmdb_id)]
    );
    database.deleteDocument(
      DATABASE_ID,
      collection,
      showFromDatabase.documents[0].$id
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
