import { useEffect, useState } from "react";
import { useSettings } from "../../context/SettingsContext";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faLayerGroup, faSkullCrossbones, faTag } from '@fortawesome/free-solid-svg-icons'
import type { TypeFilterItems, TypeFilterPath, TypeFilterType } from "./types";
import { AllergenCategory } from "./AllergenCategory";
import { FilterItem } from "./FilterItem";
import { SelectedFilterItem } from "./SelectedFilterItem";

export default function FilterLayout() {
	const settings = useSettings();
	const [filterType, setFilterType] = useState<TypeFilterType>("allergen");
	const [filterItems, setFilterItems] = useState<TypeFilterItems>({
		dish: { allergen: [], category: [], tag: [] },
		prep: { allergen: [], category: [], tag: [] },
		ingredient: { allergen: [], category: [], tag: [] }
	});

	const location = useLocation();
	const currentPath = location.pathname.split("/").pop() as TypeFilterPath;

	const handleSelect = (filterBy: TypeFilterType, itemName: string, checked: boolean) => {
		setFilterItems((prev) => {
			const updatedFilterItem = {
				...prev,
				[currentPath]: {
					...prev[currentPath],
					[filterBy]: [...prev[currentPath][filterBy]]
				}
			};

			if (checked) {
				if (!updatedFilterItem[currentPath][filterBy].includes(itemName)) {
					updatedFilterItem[currentPath][filterBy].push(itemName);
				}
			} else {
				updatedFilterItem[currentPath][filterBy] =
					updatedFilterItem[currentPath][filterBy].filter(
						(item) => item !== itemName
					);
			}
			return updatedFilterItem;
		});
	};

	useEffect(() => {
		setFilterType("allergen");
	}, [settings]);

	return (
		<div className="my-[5%] mx-[5%] rounded-xl shadow-xl bg-white w-full overflow-scroll">
			<div className="flex pt-10 pr-10 pl-10 h-[90%]">
				<div className="basis-1/5 pr-5 border-r-1 border-r-gray-200">
					<h2 className="text-xl mb-3">Filter by</h2>
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
				<div className="basis-2/5 px-5 border-r-1 border-r-gray-200 overflow-scroll">
					<h2 className="text-md">Show Only</h2>
					<ul className={`${filterType != "allergen" ? "hidden" : ""} list-none capitalize flex flex-col gap-2 py-2`}>
						{
							settings?.allergen?.map((data: any) => (
								<AllergenCategory
									data={data}
									key={data.category}
									onSelect={handleSelect}
									filterItems={filterItems}
									currentPath={currentPath}
									filterBy="allergen" />
							))
						}
					</ul>
					<ul className={`${filterType != "category" ? "hidden" : ""} list-none capitalize flex flex-col gap-2 py-2`}>
						{
							settings?.[currentPath].category?.map((data: any, categoryIndex: number) => (
								<FilterItem
									itemName={data}
									key={categoryIndex}
									onSelect={handleSelect}
									checked={filterItems[currentPath].category.includes(data)}
									filterBy="category" />
							))
						}
					</ul>
					<ul className={`${filterType != "tag" ? "hidden" : ""} list-none capitalize flex flex-col gap-2 py-2`}>
						{
							settings?.[currentPath].tag?.map((data: any, categoryIndex: number) => (
								<FilterItem
									itemName={data}
									key={categoryIndex}
									onSelect={handleSelect}
									checked={filterItems[currentPath].tag.includes(data)}
									filterBy="tag" />
							))
						}
					</ul>
				</div>
				<div className="basis-2/5 pl-5 overflow-scroll">
					<h2 className="text-md">Filter Selected</h2>
					<ul className="list-none capitalize flex flex-col gap-3">
						<li className="border-b-1 border-gray-200 pb-2">
							<h3 className="capitalize text-lg font-bold py-2">allergen</h3>
							<ul className="flex flex-wrap gap-1">
								{
									filterItems[currentPath].allergen.map((selectedItems: string, index: number) => (
										<SelectedFilterItem key={index} filterBy="allergen" selectedItems={selectedItems} onSelect={handleSelect} />
									))
								}
							</ul>
						</li>
						<li className="border-b-1 border-gray-200 pb-2">
							<h3 className="capitalize text-lg font-bold py-2">category</h3>
							<ul className="flex flex-wrap gap-1">
								{
									filterItems[currentPath].category.map((selectedItems: string, index: number) => (
										<SelectedFilterItem key={index} filterBy="category" selectedItems={selectedItems} onSelect={handleSelect} />
									))
								}
							</ul>
						</li>
						<li className="border-b-1 border-gray-200 pb-2">
							<h3 className="capitalize text-lg font-bold py-2">tag</h3>
							<ul className="flex flex-wrap gap-1">
								{
									filterItems[currentPath].tag.map((selectedItems: string, index: number) => (
										<SelectedFilterItem key={index} filterBy="tag" selectedItems={selectedItems} onSelect={handleSelect} />
									))
								}
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<div className="h-[10%] px-10 border-t-1 border-gray-200 flex items-center">
				<button className="capitalize mr-auto">reset filter</button>
				<button className="uppercase py-2 px-4 rounded-full w-30 border border-black bg-white text-black">cancel</button>
				<button className="uppercase py-2 px-4 rounded-full w-30 ml-3 bg-black text-white">apply</button>
			</div>
		</div>
	);
}
