import type { TypeAllergenStatus } from "./TypeIngredientData";
import type { TypeResource } from "./TypeResource";
import type { TypeResourceAllergen } from "./TypeResourceAllergen";

export type TypeDishData = {
	docID: string;
	id: string;
	status: "active" | "inactive" | "pending";
	store: string;
	kind: "dish";
	name: string;
	nameJa: string;
	searchKeywords: string[];
	category: string;
	image: string | File;
	description: string;
	instruction: string;
	sellPrice: number;
	totalCost: number;
	tag: string[];
	resources: Record<string, TypeResource>;
	allergenForFilter: Record<string, TypeAllergenStatus>;
	allergen: Record<string, TypeResourceAllergen>;
	updatePerson: string;
	updateDate: {
		seconds: number;
		nanoseconds: number;
	};
	createdDate: {
		seconds: number;
		nanoseconds: number;
	};
}