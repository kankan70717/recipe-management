import type { TypeResource } from "../types/recipe/TypeResource";

export const initialResourcesData: TypeResource = {
	"kind": "ingredient",
	"name": "",
	"usageAmount": 0,
	"usageUnit": "",
	"totalCost": 0,
	"removable": false,
	"resourceAllergens": {
		"allergenCategory": {
			"status": "unknown",
			"items": {
				"allergen": {
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
				"allergenCategory": {
					"status": "unknown",
					"items": {
						"allergen": {
							"status": "unknown"
						}
					}
				}
			}
		}
	}
}