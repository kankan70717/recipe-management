import type { TypeAllergenStatus } from "./TypeIngredientData";
import type { TypeResource } from "./TypeResource";
import type { TypeResourceAllergen } from "./TypeResourceAllergen";

export type TypePrepData = {
	docID: string;
	id: string;
	status: "active" | "inactive" | "pending";
	store: string;
	kind: "prep";
	name: string;
	nameJa: string;
	searchKeywords: string[];
	category: string;
	image: string | File;
	instruction: string;
	finishedAmount: number;
	usageUnit: string;
	costPerUnit: number;
	tag: string[];
	resources: Record<string, TypeResource>;
	allergenForFilter: Record<string, TypeAllergenStatus>;
	allergen: Record<string, TypeResourceAllergen>;
	dishRefs: string[];
	prepRefs: string[];
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