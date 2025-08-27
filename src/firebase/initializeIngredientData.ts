import { initialIngredientData } from "../constants/initialIngredientData";
import type { TypeIngredientData } from "../types/recipe/TypeIngredientData";
import type { TypeSetting } from "../types/TypeSetting";

export function initializeIngredientData(setting: TypeSetting) {

	const updatedInitialIngredientData: TypeIngredientData = structuredClone(initialIngredientData);

	setting.allergen.forEach((allergenCategoryObj) => {
		updatedInitialIngredientData.allergen[allergenCategoryObj.category] = {
			status: "unknown",
			items: {},
		};

		allergenCategoryObj.items.forEach((allergenName) => {
			updatedInitialIngredientData.allergen[allergenCategoryObj.category].items[allergenName] = {
				status: "unknown",
			};
		})
	});

	return updatedInitialIngredientData;
}