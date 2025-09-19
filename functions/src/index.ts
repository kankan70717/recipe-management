import * as admin from "firebase-admin";

admin.initializeApp();

/* Recipe */
/* HTTP Callable Function */
import { saveRecipe } from "./features/recipe/saveRecipe";
import { getRecipe } from "./features/recipe/getRecipe";
import { deleteRecipe } from "./features/recipe/deleteRecipe";
export { saveRecipe, getRecipe, deleteRecipe }

/* Firestore event triggers */
import { onRecipeUpdated } from "./features/recipe/eventTrigeger/onRecipeUpdate";
import { onRecipeDeleted } from "./features/recipe/eventTrigeger/onRecipeDeleted";
export { onRecipeUpdated, onRecipeDeleted}

import { getSetting } from "./features/setting/getSetting";

import { createNewUser } from "./features/users/createNewUser";
import { updateUser } from "./features/users/updateUser";
import { getUsers } from "./features/users/getUsers";

export { getSetting, createNewUser, updateUser, getUsers };
