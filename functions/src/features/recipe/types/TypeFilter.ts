export type TypeFilterKind = "dish" | "prep" | "ingredient";

export type TypeFilterType = "allergen" | "category" | "tag";

export type TypeFilterAllergen = {
	[allergenCategoryName: string]: {
		allSelected: boolean;
		items: {
			[itemName: string]: boolean;
		};
	};
};

type TypeFilterSet = {
	status: "active" | "inactive" | "pending";
	allergen: TypeFilterAllergen;
	category: { [itemName: string]: boolean };
	tag: { [itemName: string]: boolean };
};

export type TypeFilterItem = {
	currentKind: TypeFilterKind;
	dish: TypeFilterSet;
	prep: TypeFilterSet;
	ingredient: TypeFilterSet;
};