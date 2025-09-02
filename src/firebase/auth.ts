import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const auth = getAuth();

export async function registerNewUser(email: string, password: string, displayName: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName });

    return user.uid;

  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
import { getFunctions, httpsCallable } from "firebase/functions";

export async function createUserViaFunction(userData: any) {
  const functions = getFunctions();
  const createUser = httpsCallable(functions, "createUserWithRole");
  const result = await createUser(userData);
  return result.data;
}
