export type TypeIngredientData = {
	docID:string;
	id: string;
	status: "active" | "inactive";
	store: string;
	kind: "ingredient";
	name: string;
	nameJa: string;
	searchKeywords: string[];
	category: Record<string, boolean>;
	image: string;
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