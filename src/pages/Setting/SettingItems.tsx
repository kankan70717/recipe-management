import { faAngleDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export function SettingItems({
	propertyName,
	propertyValue,
}: {
	propertyName: string;
	propertyValue: string[];
}) {
	const [isAllergenCategoryOpen, setAllergenCategoryOpen] = useState(false);

	return (
		<div key={propertyName} className={`flex flex-col gap-5 capitalize border border-black p-5 bg-white duration-500 ease-in-out overflow-hidden ${isAllergenCategoryOpen ? "max-h-screen" : "max-h-15"}`}>
			<div
				className="flex justify-between items-center"
				onClick={() => setAllergenCategoryOpen(prev => !prev)}>
				<h3>{propertyName}</h3>
				<FontAwesomeIcon icon={faAngleDown} />
			</div>
			<div className="flex flex-col gap-3 px-5">
				{
					propertyValue.map((propertyItemValue, propertyItemIndex) => (
						<div className="flex items-center gap-3">
							<input
								key={propertyItemIndex}
								id={propertyItemValue}
								name={propertyItemValue}
								type="text"
								value={propertyItemValue}
								className="border border-gray-500 px-2 w-full" />
							<FontAwesomeIcon icon={faTrash} className="text-gray-400" />
						</div>
					))
				}
			</div>
		</div>
	);
}