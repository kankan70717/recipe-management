import type { TypeResource } from "../types/recipe/TypeResource";
import type { TypeResourceAllergen } from "../types/recipe/TypeResourceAllergen";

export function resoucesToAllergen(resources: Record<string, TypeResource>) {
	const allergen: Record<string, TypeResourceAllergen> = {};

	Object.entries(resources).forEach(([_, resourceObj]) => {
		console.log("resourceObj", resourceObj);
		Object.entries(resourceObj.resourceAllergens).forEach(([resourceAllergenCategoryName, resourceAllergenCategoryItemObj]) => {

			if (!allergen[resourceAllergenCategoryName]) {
				allergen[resourceAllergenCategoryName] = {
					status: "unknown",
					items: {}
				};
			}

			switch (allergen[resourceAllergenCategoryName].status) {
				case "notContained":
					allergen[resourceAllergenCategoryName].status = resourceAllergenCategoryItemObj.status;
					break;
				case "mayContained":
					if (resourceAllergenCategoryItemObj.status == "contained"
						|| resourceAllergenCategoryItemObj.status == "removable") {
						allergen[resourceAllergenCategoryName].status = "contained";
					}
					break;
				case "removable":
					if (resourceAllergenCategoryItemObj.status == "contained"
						|| resourceAllergenCategoryItemObj.status == "mayContained") {
						allergen[resourceAllergenCategoryName].status = "contained";
					}
					break;
				case "contained":
					break;
				case "unknown":
					allergen[resourceAllergenCategoryName].status = resourceAllergenCategoryItemObj.status;
					break;
			}

			Object.entries(resourceAllergenCategoryItemObj.items).forEach(([resourceAllergenName, resourceAllergenObj]) => {
				if (!allergen[resourceAllergenCategoryName].items[resourceAllergenName]) {
					allergen[resourceAllergenCategoryName].items[resourceAllergenName] = { status: "unknown" };
				}

				switch (allergen[resourceAllergenCategoryName].items[resourceAllergenName].status) {
					case "notContained":
						allergen[resourceAllergenCategoryName].items[resourceAllergenName].status = resourceAllergenObj.status;
						break;
					case "mayContained":
						if (resourceAllergenObj.status == "contained"
							|| resourceAllergenObj.status == "removable") {
							allergen[resourceAllergenCategoryName].items[resourceAllergenName].status = "contained";
						}
						break;
					case "removable":
						if (resourceAllergenObj.status == "contained"
							|| resourceAllergenObj.status == "mayContained") {
							allergen[resourceAllergenCategoryName].items[resourceAllergenName].status = "contained";
						}
						break;
					case "contained":
						break;
					case "unknown":
						allergen[resourceAllergenCategoryName].items[resourceAllergenName].status = resourceAllergenObj.status;
						break;
				}
			})
		})
	})

	return allergen;
}