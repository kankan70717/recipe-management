import { useFilter } from "../../../context/FilterContext";
import { SelectedFilterItem } from "../SelectedFilterItem";
import type { TypeFilterPath } from "../types";

export function FilterSelectedLayout({
	currentPath
}: {
	currentPath: TypeFilterPath
}) {
	const context = useFilter();
	if (!context) {
		throw new Error("FilterContext must be used within a FilterProvider");
	}
	const { filterItem } = context;

	return (<div className="basis-2/5 pl-5 overflow-scroll">
		<h2 className="text-md">Filter Selected</h2>
		<ul className="list-none capitalize flex flex-col gap-3">
			<li className="border-b-1 border-gray-200 pb-2">
				<h3 className="capitalize text-lg font-bold py-2">allergen</h3>
				<ul className="flex flex-wrap gap-1">
					{
						Object.entries(filterItem[currentPath].allergen).flatMap(([allergenCategory, obj]) => {
							const elements = [];

							if (obj.allSelected) {
								elements.push(
									<SelectedFilterItem
										key={`all-${allergenCategory}`}
										filterPath={currentPath}
										filterType="allergen"
										filterAllergenCategory={allergenCategory}
										filterItemName={allergenCategory}
									/>
								);
							}

							Object.entries(obj.items as Record<string, boolean>).forEach(
								([allergenName, selected]) => {
									if (selected) {
										elements.push(
											<SelectedFilterItem
												key={`${allergenCategory}-${allergenName}`}
												filterPath={currentPath}
												filterType="allergen"
												filterAllergenCategory={allergenCategory}
												filterItemName={allergenName}
											/>
										);
									}
								}
							);

							return elements;
						})
					}
				</ul>
			</li>
			<li className="border-b-1 border-gray-200 pb-2">
				<h3 className="capitalize text-lg font-bold py-2">category</h3>
				<ul className="flex flex-wrap gap-1">
					{
						Object.entries(filterItem[currentPath].category).map(([itemName, selected]) => (
							selected ? <SelectedFilterItem
								key={itemName}
								filterPath={currentPath}
								filterType="category"
								filterAllergenCategory={undefined}
								filterItemName={itemName}/> : ""
						))
					}
				</ul>
			</li>
			<li className="border-b-1 border-gray-200 pb-2">
				<h3 className="capitalize text-lg font-bold py-2">tag</h3>
				<ul className="flex flex-wrap gap-1">
					{
						Object.entries(filterItem[currentPath].tag).map(([itemName, selected]) => (
							selected ? <SelectedFilterItem
								key={itemName}
								filterPath={currentPath}
								filterType="tag"
								filterAllergenCategory={undefined}
								filterItemName={itemName} /> : ""
						))
					}
				</ul>
			</li>
		</ul>
	</div>);
}