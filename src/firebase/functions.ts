import { httpsCallable } from "firebase/functions";
import { functions } from "./config";
import type { TypeFilterItem } from "../pages/Filter/type/TypeFilter";
import type { TypeDishData } from "../types/recipe/TypeDishData";
import type { TypePrepData } from "../types/recipe/TypePrepData";
import type { TypeIngredientData } from "../types/recipe/TypeIngredientData";

export const getRecipeFn = httpsCallable<
	{ filterItem: TypeFilterItem },
	(TypeDishData | TypePrepData | TypeIngredientData)[]
>(functions, "getRecipe");

export const createRecipeFn = httpsCallable<TypeDishData | TypePrepData | TypeIngredientData>(functions, "createRecipe");