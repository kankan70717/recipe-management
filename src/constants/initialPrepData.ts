import type { TypePrepData } from "../types/recipe/TypePrepData";

export const initialPrepData: TypePrepData = {
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
	costPerUsageUnit: 0,
	totalCost: 0,
	tag: [],
	resources: {},
	allergenForFilter: {},
	allergen: {},
	dishRefs: {},
	prepRefs: {},
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