import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const COLLECTION_ID_MOVIES =
  process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID_MOVIES!;

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

export const deleteShow = async (tmdb_id: number) => {
  try {
    const showFromDatabase = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("TMDB_ID", tmdb_id)]
    );
    database.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID,
      showFromDatabase.documents[0].$id
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
