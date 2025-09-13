import * as admin from "firebase-admin";

admin.initializeApp();

import { getRecipe } from "./features/recipe/getRecipe";

import { getSetting } from "./features/setting/getSetting";

import { createNewUser } from "./features/users/createNewUser";
import { updateUser } from "./features/users/updateUser";
import { getUsers } from "./features/users/getUsers";

export { getRecipe, getSetting, createNewUser, updateUser, getUsers };
