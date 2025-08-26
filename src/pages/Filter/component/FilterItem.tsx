import { useFilter } from "../../../context/FilterContext";
import type {  TypeFilterKind, TypeFilterType } from "../type/TypeFilter";

export const FilterItem = ({
	filterPath,
	filterType,
	filterAllergenCategory,
	itemName,
	checked,
}: {
	filterPath: TypeFilterKind;
	filterType: TypeFilterType;
	filterAllergenCategory: string | undefined;
	itemName: string;
	checked: boolean;
}) => {
	const context = useFilter();
	if (!context) {
		throw new Error("FilterContext must be used within a FilterProvider");
	}
	const { handleSelect } = context;

	return (
		<li className="flex items-center">
			<input
				type="checkbox"
				id={filterType + itemName}
				className="peer"
				checked={checked}
				onChange={(e) => handleSelect(
					filterPath,
					filterType,
					filterAllergenCategory,
					itemName,
					e.target.checked)} />
			<label htmlFor={filterType + itemName} className="px-1">
				{itemName}
			</label>
		</li>
	);
}