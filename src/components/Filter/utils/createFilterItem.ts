import type { TypeFilterItem, TypeFilterKind } from "../types";

export function createFilterItem(setting: any): TypeFilterItem {
	const initFilterItem: TypeFilterItem = {
		currentKind: "dish",
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

		(["dish", "prep", "ingredient"] as TypeFilterKind[]).forEach(path => {
			initFilterItem[path].allergen[allergenCategory] = {
				allSelected: false,
				items: Object.fromEntries(allergenItems.map((item: string) => [item, false]))
			};
		});
	});

	(["dish", "prep", "ingredient"] as TypeFilterKind[]).forEach(path => {
		setting[path].category.forEach((item: string) => {
			initFilterItem[path].category[item] = false;
		});
	});

	(["dish", "prep", "ingredient"] as TypeFilterKind[]).forEach(path => {
		setting[path].tag.forEach((item: string) => {
			initFilterItem[path].tag[item] = false;
		});
	});

	return initFilterItem;
}