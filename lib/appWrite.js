import { Client } from "react-native-appwrite";
import { ID, Account } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.archisman.aora",
  projectId: "6691af540038117a5c8d",
  databaseId: "6691b2d80031848fe7c6",
  userCollectionId: "6691b310002bfaf16c2f",
  videoCollectionId: "6691b34d00295fc7fa96",
  storageId: "6691b5e1000ea106fd3e",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);

export const createUser = () => {
  // Register User
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
