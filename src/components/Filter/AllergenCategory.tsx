import { useState } from "react";
import type { TypeFilterItems, TypeFilterPath, TypeFilterType } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FilterItem } from "./FilterItem";

export function AllergenCategory({
	data,
	onSelect,
	filterItems,
	currentPath,
	filterBy
}: {
	data: any;
	onSelect: (filterBy: TypeFilterType, itemName: string, checked: boolean) => void;
	filterItems: TypeFilterItems;
	currentPath: TypeFilterPath;
	filterBy: TypeFilterType;
}) {
	const [isOpen, setOpen] = useState(false);

	return (
		<li onClick={() => setOpen(prev => !prev)}>
			<div className="flex items-center justify-between py-2 border-b-1 border-gray-200">
				<h3 className="text-md">{data.category}</h3>
				<FontAwesomeIcon icon={faAngleRight} className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
			</div>
			<ul className={`flex flex-col gap-2 transition-all duration-300 ease-in-out overflow-hidden ${isOpen == true ? "max-h-1000 py-2" : "max-h-0"}`}>
				{data.items.map((itemName: string, itemIndex: number) => (
					<FilterItem
						itemName={itemName}
						key={itemIndex}
						onSelect={onSelect}
						checked={filterItems[currentPath].allergen.includes(itemName)}
						filterBy={filterBy} />
				))}
			</ul>
		</li>
	);
}
