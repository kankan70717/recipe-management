import { httpsCallable } from "firebase/functions";
import { functions } from "./config";
import type { TypeFilterItem } from "../pages/Filter/type/TypeFilter";

export const getRecipeFn = (params: { filterItem: TypeFilterItem }) => {
	const callable = httpsCallable(functions, "getRecipe");
	return callable(params);
};
