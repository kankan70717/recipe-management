import { faLayerGroup, faSkullCrossbones, faTag } from "@fortawesome/free-solid-svg-icons";
import type { TypeFilterType } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FilterTypeLayout = ({
	setFilterType,
}: {
	setFilterType: React.Dispatch<React.SetStateAction<TypeFilterType>>
}
) => {

	return (
		<div className="w-40 pr-5 border-r-1 border-r-gray-200">
			<h2 className="text-md mb-3">Filter by</h2>
			<ul className="list-none capitalize flex flex-col gap-3">
				<li>
					<input
						type="radio"
						id="allergen"
						name="filterType"
						className="hidden peer"
						onChange={() => setFilterType("allergen")}
						defaultChecked />
					<label htmlFor="allergen" className="flex items-center gap-2 w-full rounded-lg py-2 px-4 bg-white peer-checked:bg-gray-200">
						<FontAwesomeIcon className="w-4" icon={faSkullCrossbones} />
						allergens
					</label>
				</li>
				<li>
					<input
						type="radio"
						id="category"
						name="filterType"
						className="hidden peer"
						onChange={() => setFilterType("category")} />
					<label htmlFor="category" className="flex items-center gap-2 w-full rounded-lg py-2 px-4 bg-white peer-checked:bg-gray-200">
						<FontAwesomeIcon className="w-4" icon={faLayerGroup} />
						category
					</label>
				</li>
				<li>
					<input
						type="radio"
						id="tag"
						name="filterType"
						className="hidden peer"
						onClick={() => setFilterType("tag")} />
					<label htmlFor="tag" className="flex items-center gap-2 w-full rounded-lg py-2 px-4 bg-white peer-checked:bg-gray-200">
						<FontAwesomeIcon className="w-4" icon={faTag} />
						tag
					</label>
				</li>
			</ul>
		</div>
	);
}