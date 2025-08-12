import type { TypeFilterItem } from "../types";

export function createFilterItem(setting: any): TypeFilterItem {
	const initFilterItem: TypeFilterItem = {
		dish: {
			allergen: {},
			category: {},
			tag: {},
		},
		prep: {
			allergen: {},
			category: {},
			tag: {},
		},
		ingredient: {
			allergen: {},
			category: {},
			tag: {},
		},
	};

	setting.allergen.forEach((allergenObj: any) => {
		const allergenCategory = allergenObj.category;
		const allergenItems = allergenObj.items;

		["dish", "prep", "ingredient"].forEach(path => {
			initFilterItem[path as keyof TypeFilterItem].allergen[allergenCategory] = {
				allSelected: false,
				items: Object.fromEntries(allergenItems.map((item: string) => [item, false]))
			};
		});
	});

	["dish", "prep", "ingredient"].forEach(path => {
		setting[path as keyof TypeFilterItem].category.forEach((item: string) => {
			initFilterItem[path as keyof TypeFilterItem].category[item] = false;
		});
	});

	["dish", "prep", "ingredient"].forEach(path => {
		setting[path as keyof TypeFilterItem].tag.forEach((item: string) => {
			initFilterItem[path as keyof TypeFilterItem].tag[item] = false;
		});
	});

	return initFilterItem;
}