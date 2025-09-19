import * as admin from "firebase-admin";

admin.initializeApp();

import { saveRecipe } from "./features/recipe/saveRecipe";
import { getRecipe } from "./features/recipe/getRecipe";
import { onRecipeUpdated } from "./features/recipe/onRecipeUpdate";

import { getSetting } from "./features/setting/getSetting";

import { createNewUser } from "./features/users/createNewUser";
import { updateUser } from "./features/users/updateUser";
import { getUsers } from "./features/users/getUsers";

export { saveRecipe, getRecipe, onRecipeUpdated, getSetting, createNewUser, updateUser, getUsers };
