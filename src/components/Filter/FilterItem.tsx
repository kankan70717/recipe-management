import type { TypeFilterType } from "./types";

export function FilterItem({
	itemName,
	onSelect,
	checked,
	filterBy
}: {
	itemName: string;
	onSelect: (filterBy: TypeFilterType, itemName: string, checked: boolean) => void;
	checked: boolean;
	filterBy: TypeFilterType;
}) {

	return (
		<li className="flex items-center">
			<input
				type="checkbox"
				id={itemName}
				className="peer"
				checked={checked}
				onChange={(e) => onSelect(filterBy, itemName, e.target.checked)} />
			<label htmlFor={itemName} className="px-1">
				{itemName}
			</label>
		</li>
	);
}