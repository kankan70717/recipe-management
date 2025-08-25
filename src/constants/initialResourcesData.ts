import type { TypeResource } from "../types/recipe/TypeResource";

export const initialResourcesData: TypeResource = {
	"kind": "ingredient",
	"name": "",
	"usageAmount": 0,
	"usageUnit": "",
	"totalCost": 0,
	"removable": false,
	"resourceAllergens": {
		"allergenCategoryName": {
			"status": "unknown",
			"items": {
				"allergenName": {
					"status": "unknown"
				}
			}
		}
	},
	"substitute": {
		"substituteID": {
			"kind": "ingredient",
			"name": "",
			"usageAmount": 0,
			"usageUnit": "",
			"totalCost": 0,
			"resourceAllergens": {
				"allergenCategoryName": {
					"status": "unknown",
					"items": {
						"allergenName": {
							"status": "unknown"
						}
					}
				}
			}
		}
	}
}