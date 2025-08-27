import type { TypeDishData } from "../types/recipe/TypeDishData";

export const initialDishData: TypeDishData = {
	docID: "",
	id: "",
	status: "active",
	store: "",
	kind: "dish",
	name: "",
	nameJa: "",
	searchKeywords: [],
	category: "",
	image: "",
	description: "",
	instruction: "",
	sellPrice: 0,
	totalCost: 0,
	tag: [],
	resources: {},
	allergenForFilter: {},
	allergen: {},
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