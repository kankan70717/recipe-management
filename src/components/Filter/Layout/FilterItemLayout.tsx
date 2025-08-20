import { useFilter } from "../../../context/FilterContext";
import { useSetting } from "../../../context/SettingsContext";
import { AllergenCategory } from "../AllergenCategory";
import { FilterItem } from "../FilterItem";
import type { TypeFilterKind, TypeFilterType } from "../types";

export const FilterItemLayout = ({
	currentKind,
	filterType
}: {
	currentKind: TypeFilterKind;
	filterType: TypeFilterType;
}) => {
	const settingContext = useSetting();
	if (!settingContext) {
		throw new Error("SettingContext must be used within a SettingProvider");
	}
	const { setting } = settingContext;

	const filterContext = useFilter();
	if (!filterContext) {
		throw new Error("FilterContext must be used within a FilterProvider");
	}
	const { filterItem } = filterContext;

	return (
		<div className="w-50 px-5 border-r-1 border-r-gray-200 overflow-scroll">
			<h2 className="text-md">Show Only</h2>
			<ul className={`${filterType != "allergen" ? "hidden" : ""} list-none capitalize flex flex-col gap-2 py-2`}>
				{
					setting.allergen.map((allergenObj: any, index: number) => (
						<AllergenCategory key={index} currentPath={currentKind} allergenObj={allergenObj} />
					))
				}
			</ul>
			<ul className={`${filterType != "category" ? "hidden" : ""} list-none capitalize flex flex-col gap-2 py-2`}>
				{
					setting[currentKind].category.map((itemName: any, index: number) => (
						<FilterItem
							key={index}
							filterPath={currentKind}
							filterType="category"
							filterAllergenCategory={undefined}
							itemName={itemName}
							checked={filterItem[currentKind].category[itemName]} />
					))
				}
			</ul>
			<ul className={`${filterType != "tag" ? "hidden" : ""} list-none capitalize flex flex-col gap-2 py-2`}>
				{
					setting[currentKind].tag?.map((itemName: any, index: number) => (
						<FilterItem
							key={index}
							filterPath={currentKind}
							filterType="tag"
							filterAllergenCategory={undefined}
							itemName={itemName}
							checked={filterItem[currentKind].tag[itemName]} />
					))
				}
			</ul>
		</div>
	);
}