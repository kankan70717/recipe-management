export type TypeIngredientData = {
	docID: string;
	id: string;
	status: "active" | "inactive";
	store: string;
	kind: "ingredient";
	name: string;
	nameJa: string;
	searchKeywords: string[];
	category: Record<string, boolean>;
	image: string | File;
	vendor: string;
	purchasePrice: number;
	purchaseQuantity: number;
	purchaseUnit: string;
	usageUnit: string;
	unitConversionRate: number;
	yieldRate: number;
	tag: Record<string, boolean>;
	allergenForFilter: Record<string, "contained" | "mayContained" | "notContained" | "removable" | "unknown">;
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
export type TypeIngredientFormData = {
	docID: string;
	id: string;
	status: "active" | "inactive";
	store: string;
	kind: "ingredient";
	name: string;
	nameJa: string;
	searchKeywords: string[];
	category: Record<string, boolean>;
	image: File;
	vendor: string;
	purchasePrice: number;
	purchaseQuantity: number;
	purchaseUnit: string;
	usageUnit: string;
	unitConversionRate: number;
	yieldRate: number;
	tag: Record<string, boolean>;
	allergenForFilter: Record<string, string>;
	dishRefs: string[];
	prepRefs: string[];
	updatePerson: string;
	updateDate: string;
}