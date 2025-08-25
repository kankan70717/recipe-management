import type { TypeDishData } from "../types/recipe/TypeDishData";
import { initialResourcesData } from "./initialResourcesData";

export const initialDishData: TypeDishData = {
	docID: "",
	id: "",
	status: "active",
	store: "",
	kind: "prep",
	name: "",
	nameJa: "",
	searchKeywords: [],
	category: "",
	image: "",
	instruction: "",
	finishedAmount: 0,
	usageUnit: "",
	totalCost: 0,
	tag: [],
	resources: {
		"sample": initialResourcesData
	},
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