import { Account, Client, Databases, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.kjt.inthequeue",
  projectId: "67ccac25003c1ec88c59",
  databaseId: "67ccadcc00313ad68477",
  showsCollectionId: "67ccae08003bc9a4e0f6",
  storageId: "67ccb22f0023ecad0b02",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  showsCollectionId,
  storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setPlatform(platform); // Your application ID or bundle ID.

const account = new Account(client);
const databases = new Databases(client);

export const getAllShows = async () => {
  try {
    const shows = await databases.listDocuments(databaseId, showsCollectionId);
    return shows.documents;
  } catch (error) {
    throw new Error(error);
  }
};
