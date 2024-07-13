import { Avatars, Client, Databases, Query } from "react-native-appwrite";
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
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (username, email, password) => {
  // Register User
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarURL = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarURL,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  await account.deleteSessions();
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw Error;
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    console.log(currentAccount);

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    console.log(currentUser);
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};
