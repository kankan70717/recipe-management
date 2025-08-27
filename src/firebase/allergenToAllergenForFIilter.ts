import type { TypeResourceAllergen } from "../types/recipe/TypeResourceAllergen";

export function allergenToAllergenForFiilter(allergen: Record<string, TypeResourceAllergen>) {
	const allergenForFilter: Record<string, string> = {};
	Object.entries(allergen).forEach(([allergenCategory, allergenCategoryObj]) => {
		allergenForFilter[allergenCategory] = allergenCategoryObj.status;
		Object.entries(allergenCategoryObj.items).forEach(([allergenName, allergenNameObj]) => {
			allergenForFilter[allergenName] = allergenNameObj.status;
		})
	});

	return allergenForFilter;
}