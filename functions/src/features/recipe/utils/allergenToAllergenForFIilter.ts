import { TypeAllergenStatus } from "../types/TypeIngredientData";
import { TypeResourceAllergen } from "../types/TypeResourceAllergen";

export function allergenToAllergenForFiilter(allergen: Record<string, TypeResourceAllergen>) {
	const allergenForFilter: Record<string, TypeAllergenStatus> = {};
	Object.entries(allergen).forEach(([allergenCategory, allergenCategoryObj]) => {
		allergenForFilter[allergenCategory] = allergenCategoryObj.status;
		Object.entries(allergenCategoryObj.items).forEach(([allergenName, allergenNameObj]) => {
			allergenForFilter[allergenName] = allergenNameObj.status;
		})
	});

	return allergenForFilter;
}