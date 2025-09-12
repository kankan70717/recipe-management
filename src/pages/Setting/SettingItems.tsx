import { faAngleDown, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { TypeSetting } from "../../types/TypeSetting";
import type { TypeFilterKind } from "../Filter/type/TypeFilter";

export function SettingItems({
	kind,
	propertyName,
	propertyValue,
	setSettingFormData,

}: {
	kind: TypeFilterKind;
	propertyName: "category" | "tag";
	propertyValue: string[];
	setSettingFormData: Dispatch<SetStateAction<TypeSetting>>;

}) {
	const [isAllergenCategoryOpen, setAllergenCategoryOpen] = useState(false);

	return (
		<div key={propertyName} className={`flex flex-col gap-5 capitalize border border-black p-5 bg-white duration-500 ease-in-out overflow-hidden ${isAllergenCategoryOpen ? "max-h-[2000px]" : "max-h-15"}`}>
			<div
				className="flex justify-between items-center"
				onClick={() => setAllergenCategoryOpen(prev => !prev)}>
				<h3>{propertyName}</h3>
				<FontAwesomeIcon icon={faAngleDown} />
			</div>
			<div className="flex flex-col gap-3 px-5">
				{
					propertyValue.map((propertyItemValue, propertyItemIndex) => (
						<div
							key={propertyItemIndex}
							className="flex items-center gap-3">
							<input
								id={`${kind}-${propertyName}-${propertyItemIndex}`}
								name={`${kind}-${propertyName}-${propertyItemIndex}`}
								type="text"
								value={propertyItemValue}
								className="border border-gray-500 px-2 w-full"
								onChange={(e) => {
									const newValue = e.target.value;
									setSettingFormData((prev) => {
										const updated = structuredClone(prev);
										updated[kind][propertyName][propertyItemIndex] = newValue;
										return updated;
									});
								}} />
							<FontAwesomeIcon
								icon={faTrash}
								className="text-gray-400"
								onClick={() => {
									setSettingFormData((prev) => {
										const updated = structuredClone(prev);
										updated[kind][propertyName].splice(propertyItemIndex, 1);
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
									updated[kind][propertyName].push("");
									return updated;
								});
							}} >
							add new {propertyName}
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}