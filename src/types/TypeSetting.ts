export type TypeSetting = {
	allergen: {
		category: string,
		items: string[]
	}[];
	dish: {
		category: string[];
		tag: string[];
	};
	prep: {
		category: string[];
		tag: string[];
	};
	ingredient: {
		category: string[];
		tag: string[];
	};
}