import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { TypeFilterType } from "./types";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export function SelectedFilterItem({
	filterBy,
	selectedItems,
	onSelect,
}: {
	filterBy: TypeFilterType,
	selectedItems: string;
	onSelect: (filterBy: TypeFilterType, itemName: string, checked: boolean) => void;
}) {
	return (
		<li>
			<button
				className="flex items-center gap-1 py-2 px-4 rounded-full bg-gray-200 text-xs capitalize"
				onClick={() => onSelect(filterBy, selectedItems, false)}>
				{selectedItems}
				<FontAwesomeIcon icon={faXmark} />
			</button>
		</li>
	);
}