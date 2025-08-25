import type { TypeAllergenStatus } from "./TypeIngredientData";
import type { TypeResource } from "./TypeResource";

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
	totalCost: number;
	tag: string[];
	resources: Record<string, TypeResource>;
	allergenForFilter: Record<string, TypeAllergenStatus>;
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