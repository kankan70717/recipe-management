export type TypeAllergenStatus = "contained" | "mayContained" | "notContained" | "removable" | "unknown";
export type TypeIngredientData = {
	docID: string;
	id: string;
	status: "active" | "inactive";
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
	tag: string[];
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