import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { TypeFilterKind, TypeFilterType } from "../type/TypeFilter";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useFilter } from "../../../context/FilterContext";

export function SelectedFilterItem({
	filterkind,
	filterType,
	filterAllergenCategory,
	filterItemName,
}: {
	filterkind: TypeFilterKind,
	filterType: TypeFilterType,
	filterAllergenCategory: string | undefined,
	filterItemName: string,
}) {
	const context = useFilter();
	if (!context) {
		throw new Error("FilterContext must be used within a FilterProvider");
	}
	const { handleSelect } = context;

	return (
		<li>
			<button
				className="flex items-center gap-1 py-2 px-4 rounded-full bg-gray-200 text-xs capitalize"
				onClick={() => handleSelect(filterkind, filterType, filterAllergenCategory, filterItemName, false)}>
				{filterAllergenCategory == filterItemName ? "All " + filterItemName : filterItemName}
				<FontAwesomeIcon icon={faXmark} />
			</button>
		</li>
	);
}