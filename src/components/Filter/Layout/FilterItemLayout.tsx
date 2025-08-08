import { useFilter } from "../../../context/FilterContext";
import { useSetting } from "../../../context/SettingsContext";
import { AllergenCategory } from "../AllergenCategory";
import { FilterItem } from "../FilterItem";
import type { TypeFilterPath, TypeFilterType } from "../types";

export const FilterItemLayout = ({
	currentPath,
	filterType
}: {
	currentPath: TypeFilterPath;
	filterType: TypeFilterType;
}) => {
	const { setting } = useSetting();
	const context = useFilter();
	if (!context) {
		throw new Error("FilterContext must be used within a FilterProvider");
	}
	const { filterItem } = context;

	return (
		<div className="basis-2/5 px-5 border-r-1 border-r-gray-200 overflow-scroll">
			<h2 className="text-md">Show Only</h2>
			<ul className={`${filterType != "allergen" ? "hidden" : ""} list-none capitalize flex flex-col gap-2 py-2`}>
				{
					setting.allergen.map((allergenObj: any, index: number) => (
						<AllergenCategory key={index} currentPath={currentPath} allergenObj={allergenObj} />
					))
				}
			</ul>
			<ul className={`${filterType != "category" ? "hidden" : ""} list-none capitalize flex flex-col gap-2 py-2`}>
				{
					setting[currentPath].category.map((itemName: any, index: number) => (
						<FilterItem
							key={index}
							filterPath={currentPath}
							filterType="category"
							filterAllergenCategory={undefined}
							itemName={itemName}
							checked={filterItem[currentPath].category[itemName]} />
					))
				}
			</ul>
			<ul className={`${filterType != "tag" ? "hidden" : ""} list-none capitalize flex flex-col gap-2 py-2`}>
				{
					setting[currentPath].tag?.map((itemName: any, index: number) => (
						<FilterItem
							key={index}
							filterPath={currentPath}
							filterType="tag"
							filterAllergenCategory={undefined}
							itemName={itemName}
							checked={filterItem[currentPath].tag[itemName]} />
					))
				}
			</ul>
		</div>
	);
}