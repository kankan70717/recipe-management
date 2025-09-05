import { createNewUser } from "./users/createNewUser";
import { updateUser } from "./users/updateUser";
import * as admin from "firebase-admin";

admin.initializeApp();

export { createNewUser };
export { updateUser }