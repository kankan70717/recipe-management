export type TypeFilterType = "allergen" | "category" | "tag";

export type TypeFilterPath = "dish" | "prep" | "ingredient";

export type TypeFilterItems = {
	dish: { allergen: string[], category: string[], tag: string[] };
	prep: { allergen: string[], category: string[], tag: string[] };
	ingredient: { allergen: string[], category: string[], tag: string[] };
};