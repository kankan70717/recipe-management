import type { TypeResourceAllergen } from "./TypeResourceAllergen";
export type TypeAllergenStatus = "contained" | "mayContained" | "notContained" | "removable" | "unknown";

export type TypeIngredientData = {
	docID: string;
	id: string;
	status: "active" | "inactive" | "pending";
	store: string;
	kind: "ingredient";
	name: string;
	nameJa: string;
	searchKeywords: string[];
	category: string;
	image: string | File;
	vendor: string;
	purchasePrice: number;
	purchaseQuantity: number;
	purchaseUnit: string;
	usageUnit: string;
	unitConversionRate: number;
	yieldRate: number;
	costPerUsageUnit: number;
	tag: string[];
	allergenForFilter: Record<string, TypeAllergenStatus>;
	allergen: Record<string, TypeResourceAllergen>;
	dishRefs: Record<string, { name: string, image: string }>;
	prepRefs: Record<string, { name: string, image: string }>;
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