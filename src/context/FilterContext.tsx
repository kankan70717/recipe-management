import { createContext, useContext, useState, type ReactNode } from "react";
import type { TypeFilterItem, TypeFilterKind, TypeFilterType } from "../pages/Filter/type/TypeFilter";
import { createFilterItem } from "../pages/Filter/utils/createFilterItem";
import { useSetting } from "./SettingsContext";

type TypeFilterContext = {
	filterItem: TypeFilterItem,
	handleSelect: (
		filterKind: TypeFilterKind,
		filterType: TypeFilterType | undefined,
		filterAllergenCategory: string | undefined,
		filterItemName: string,
		checked: boolean
	) => void;
}
export const FilterContext = createContext<TypeFilterContext | null>(null);

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({
	children,
}: {
	children: ReactNode,
}
) => {
	const settingContext = useSetting();
	if (!settingContext) {
		throw new Error("SettingContext must be used within a SettingProvider");
	}
	const { setting } = settingContext;
	const [filterItem, updateFilterItem] = useState<TypeFilterItem>(() => createFilterItem(setting));

	const handleSelect = (
		filterKind: TypeFilterKind,
		filterType: TypeFilterType | undefined,
		filterAllergenCategory: string | undefined,
		filterItemName: string,
		checked: boolean
	) => {
		updateFilterItem((prev) => {

			const updatedFilterItem = {
				...prev,
				"dish": {
					...prev.dish,
					"allergen": { ...prev.dish.allergen },
					"category": { ...prev.dish.category },
					"tag": { ...prev.dish.tag }
				},
				"prep": {
					...prev.prep,
					"allergen": { ...prev.prep.allergen },
					"category": { ...prev.prep.category },
					"tag": { ...prev.prep.tag }
				},
				"ingredient": {
					...prev.ingredient,
					"allergen": { ...prev.ingredient.allergen },
					"category": { ...prev.ingredient.category },
					"tag": { ...prev.ingredient.tag }
				}
			};

			if (filterType === "allergen" && filterAllergenCategory != undefined) {
				if (filterAllergenCategory != filterItemName) {
					updatedFilterItem[filterKind].allergen[filterAllergenCategory].items[filterItemName] = checked;
				} else {
					updatedFilterItem[filterKind].allergen[filterAllergenCategory].allSelected = checked;
				}
			} else if (filterType != undefined) {
				updatedFilterItem[filterKind][filterType][filterItemName] = checked;
			} else {
				updatedFilterItem.currentKind = filterKind;
			}

			console.log("updatedFilterItem", updatedFilterItem);
			return updatedFilterItem;
		});
	};

	return (
		<FilterContext.Provider value={{ filterItem, handleSelect }}>
			{children}
		</FilterContext.Provider>
	);
};