import { createContext, useContext, useState, type ReactNode } from "react";
import type { TypeFilterItem, TypeFilterPath, TypeFilterType } from "../components/Filter/types";

type TypeFilterContext = {
	filterItem: TypeFilterItem,
	handleSelect: (
		filterPath: TypeFilterPath,
		filterType: TypeFilterType,
		filterAllergenCategory: string | undefined,
		filterItemName: string,
		checked: boolean
	) => void;
}
export const FilterContext = createContext<TypeFilterContext | null>(null);

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({
	children,
	initFilterItem
}: {
	children: ReactNode,
	initFilterItem: TypeFilterItem
}
) => {
	const [filterItem, updateFilterItem] = useState<TypeFilterItem>(initFilterItem);

	const handleSelect = (
		filterPath: TypeFilterPath,
		filterType: TypeFilterType,
		filterAllergenCategory: string | undefined,
		filterItemName: string,
		checked: boolean
	) => {
		updateFilterItem((prev) => {

			const updatedFilterItem = {
				...prev,
				[filterPath]: {
					...prev[filterPath],
					[filterType]: filterType == "allergen"
						? { ...prev[filterPath][filterType] }
						: { ...prev[filterPath][filterType] }
				}
			};

			if (filterType === "allergen" && filterAllergenCategory != undefined) {
				if (filterAllergenCategory != filterItemName) {
					updatedFilterItem[filterPath].allergen[filterAllergenCategory].items[filterItemName] = checked;
				} else {
					updatedFilterItem[filterPath].allergen[filterAllergenCategory].allSelected = checked;
				}
			} else {
				updatedFilterItem[filterPath][filterType][filterItemName] = checked;
			}

			return updatedFilterItem;
		});
	};

	return (
		<FilterContext.Provider value={{ filterItem, handleSelect }}>
			{children}
		</FilterContext.Provider>
	);
};