import * as admin from "firebase-admin";

admin.initializeApp();

import { getRecipe } from "./features/recipe/getRecipe";
import { createRecipe } from "./features/recipe/createRecipe";
import { getSetting } from "./features/setting/getSetting";

import { createNewUser } from "./features/users/createNewUser";
import { updateUser } from "./features/users/updateUser";
import { getUsers } from "./features/users/getUsers";

export { getRecipe, createRecipe, getSetting, createNewUser, updateUser, getUsers };
