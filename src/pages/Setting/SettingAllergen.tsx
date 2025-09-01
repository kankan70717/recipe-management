/* import { useState } from "react";

export function SettingAllergen({
	allergenCategoryObj,
	allergenCategoryIndex,
	handleAllergen
}: {
	allergenCategoryObj: { category: string, items: string[] }
	allergenCategoryIndex: number;
	handleAllergen: () => void;
}) {

	const [newAllergen, setNewAllergen] = useState("");
	return (
		<div key={allergenCategoryIndex} className="capitalize mb-3">
			<div className="text-lg">{allergenCategoryObj.category}</div>
			<div className="flex flex-wrap gap-2">
				{
					allergenCategoryObj.items.map((allergenName, allergenIndex) => (
						<input
							key={allergenIndex}
							id={allergenName}
							name={allergenName}
							type="text"
							value={allergenName}
							className="border border-gray-500 rounded px-2" />
					))
				}
				<div className="basis-full mt-2 text-right">
					<input
						id={newAllergen}
						name={newAllergen}
						type="text"
						value={newAllergen}
						className="border border-gray-300 rounded px-2"
						onChange={(e) => setNewAllergen(e.target.value)} />
					<button
						className="capitalize px-5 rounded-full border border-black ml-3">
						add
					</button>
				</div>
			</div>
		</div>
	);
} */