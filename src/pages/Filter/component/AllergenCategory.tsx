import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FilterItem } from "./FilterItem";
import { useFilter } from "../../../context/FilterContext";
import type { TypeFilterKind } from "../type/TypeFilter";

export const AllergenCategory = ({
	currentPath,
	allergenObj
}: {
	currentPath: TypeFilterKind;
	allergenObj: {
		category: string;
		items: string[]
	};
}) => {
	const [isOpen, setOpen] = useState(false);
	const context = useFilter();
	if (!context) {
		throw new Error("FilterContext must be used within a FilterProvider");
	}
	const { filterItem, handleSelect } = context;

	return (
		<li onClick={() => setOpen(prev => !prev)}>
			<div className="flex items-center justify-between py-2 border-b-1 border-gray-200">
				<h3 className="text-md flex items-center">
					{allergenObj.category}
				</h3>
				<FontAwesomeIcon icon={faAngleRight} className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
			</div>
			<ul className={`flex flex-col gap-2 transition-all duration-300 ease-in-out overflow-hidden ${isOpen == true ? "max-h-1000 py-2" : "max-h-0"}`}>
				<li>
					<input
						type="checkbox"
						id={allergenObj.category}
						className="peer"
						checked={filterItem[currentPath].allergen[allergenObj.category].allSelected}
						onChange={(e) => handleSelect(currentPath, "allergen", allergenObj.category, allergenObj.category, e.target.checked)} />
					<label htmlFor={allergenObj.category} className="px-1">
						All {allergenObj.category}
					</label>
				</li>
				{allergenObj.items.map((itemName: string, itemIndex: number) => (
					<FilterItem
						key={itemIndex}
						filterPath={currentPath}
						filterType="allergen"
						filterAllergenCategory={allergenObj.category}
						itemName={itemName}
						checked={filterItem[currentPath].allergen[allergenObj.category].items[itemName]} />
				))}
			</ul>
		</li>
	);
}
