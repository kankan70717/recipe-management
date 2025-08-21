import type { TypeIngredientData } from "../types/TypeIngredientData";

export const initialIngredientData: TypeIngredientData = {
	docID: "",
	id: "",
	status: "active",
	store: "",
	kind: "ingredient",
	name: "",
	nameJa: "",
	searchKeywords: [],
	category: "",
	image: "",
	vendor: "",
	purchasePrice: 0,
	purchaseQuantity: 0,
	purchaseUnit: "",
	usageUnit: "",
	unitConversionRate: 0,
	yieldRate: 0,
	tag: [],
	allergenForFilter: {},
	dishRefs: [],
	prepRefs: [],
	updatePerson: "",
	updateDate: {
		seconds: 0,
		nanoseconds: 0,
	},
	createdDate: {
		seconds: 0,
		nanoseconds: 0,
	}
}