import { useEffect } from "react";
import { useFilter } from "../../../context/FilterContext";
import type { TypeFilterPath } from "../types";
import { fetchRecipe } from "../../../firebase/firestore";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function FilterResultLayout() {
	const context = useFilter();
	if (!context) {
		throw new Error("FilterContext must be used within a FilterProvider");
	}
	const { filterItem } = context;
	const currentPath = location.pathname.split("/")[2] as TypeFilterPath;
	console.log("currentPath", currentPath);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const recipeData = await fetchRecipe(currentPath, filterItem);
				console.log("recipeData", recipeData);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="my-[5%] mx-[5%] rounded-xl shadow-xl bg-white w-full overflow-scroll">
			<div className="pt-6 pr-10 pl-10">
				<h2 className="flex items-center gap-2">
					<Link to={`/dashboard/${currentPath}`}
						className="capitalize">
						{currentPath}
					</Link>
					<FontAwesomeIcon icon={faAngleRight} className="" />
					Filter Result
				</h2>
				<div className="flex items-center gap-3 mt-3">
					<div>Filtered by:</div>
					<div className="flex gap-2">
						{
							Object.entries(filterItem[currentPath].allergen).map(([allergenCategory, obj]) => {
								let elements = [];
								if (obj.allSelected) {
									elements.push(<span
										key={allergenCategory}
										className="rounded-full bg-gray-200 px-4 py-2 capitalize text-sm">
										All {allergenCategory}
									</span>);
								} else {
									Object.entries(filterItem[currentPath].allergen[allergenCategory].items).map(([allergenName, selected]) => {
										if (selected) {
											elements.push(<span
												key={allergenName}
												className="rounded-full bg-gray-200 px-4 py-2 capitalize text-sm">
												{allergenName}
											</span>);
										}
									})
								}
								return elements;
							})
						}
					</div>
				</div>
			</div>
		</div >
	);
}