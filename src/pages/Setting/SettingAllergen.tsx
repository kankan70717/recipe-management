import { faAngleDown, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { TypeSetting } from "../../types/TypeSetting";

export function SettingAllergen({
	allergenCategoryObj,
	allergenCategoryIndex,
	setSettingFormData,
}: {
	allergenCategoryObj: { category: string, items: string[] }
	allergenCategoryIndex: number;
	setSettingFormData: Dispatch<SetStateAction<TypeSetting>>;
}) {
	const [isAllergenCategoryOpen, setAllergenCategoryOpen] = useState(false);

	return (
		<div key={allergenCategoryIndex} className={`flex flex-col gap-5 capitalize border border-black p-5 bg-white duration-500 ease-in-out overflow-hidden ${isAllergenCategoryOpen ? "max-h-[2000px]" : "max-h-15"}`}>
			<div
				className="flex justify-between items-center"
				onClick={() => setAllergenCategoryOpen(prev => !prev)}>
				<h3>{allergenCategoryObj.category}</h3>
				<FontAwesomeIcon icon={faAngleDown} />
			</div>
			<div className="flex flex-col gap-3 px-5">
				{
					allergenCategoryObj.items.map((allergenName, allergenIndex) => (
						<div
							key={allergenIndex}
							className="flex items-center gap-3">
							<input
								key={allergenIndex}
								id={allergenName}
								name={allergenName}
								type="text"
								value={allergenName}
								className="border border-gray-500 px-2 w-full"
								onChange={(e) => {
									const newValue = e.target.value;
									setSettingFormData((prev) => {
										const updated = structuredClone(prev);
										updated.allergen[allergenCategoryIndex].items[allergenIndex] = newValue;
										return updated;
									});
								}} />
							<FontAwesomeIcon
								icon={faTrash}
								className="text-gray-400"
								onClick={() => {
									setSettingFormData((prev) => {
										const updated = structuredClone(prev);
										updated.allergen[allergenCategoryIndex].items.splice(allergenIndex, 1);
										return updated;
									});
								}} />
						</div>
					))
				}
				<div>
					<button className="flex items-center gap-3">
						<FontAwesomeIcon icon={faPlus} />
						<span
							className="capitalize"
							onClick={() => {
								setSettingFormData((prev) => {
									const updated = structuredClone(prev);
									updated.allergen[allergenCategoryIndex].items.push("");
									return updated;
								});
							}} >
							add new allergen
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}