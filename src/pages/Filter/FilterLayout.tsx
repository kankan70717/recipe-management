import { useNavigate } from "react-router-dom";
import type { TypeFilterType } from "./type/TypeFilter";
import { FilterItemLayout } from "./component/FilterItemLayout";
import { FilterTypeLayout } from "./component/FilterTypeLayout";
import { FilterSelectedLayout } from "./component/FilterSelectedLayout";
import { useState } from "react";
import { useFilter } from "../../context/FilterContext";

export default function FilterLayout() {
	const [filterType, setFilterType] = useState<TypeFilterType>("allergen");
	const navigation = useNavigate();
	const context = useFilter();
	if (!context) {
		throw new Error("FilterContext must be used within a FilterProvider");
	}
	const { filterItem, handleSelect, clearFilter } = context;

	return (
		<div className="relative h-full">
			<div className="pt-6 pr-10 pl-10 h-[90%] flex flex-col">
				<div className="flex items-center mb-5">
					<h2 className="capitalize text-2xl mr-5">search</h2>
					<div className="capitalize flex gap-2">
						<label htmlFor="dish" className="w-30 text-center border border-black rounded-full px-3 py-2 has-checked:bg-black has-checked:text-white">
							<input
								type="radio"
								id="dish"
								className="hidden"
								name="filterKind"
								checked={filterItem.currentKind == "dish"}
								onChange={() => handleSelect("dish", undefined, undefined, "", true)} />
							<span>dish</span>
						</label>
						<label htmlFor="prep" className="w-30 text-center border border-black rounded-full px-3 py-2 has-checked:bg-black has-checked:text-white">
							<input
								type="radio"
								id="prep"
								className="hidden"
								name="filterKind"
								checked={filterItem.currentKind == "prep"}
								onChange={() => handleSelect("prep", undefined, undefined, "", true)} />
							<span>prep</span>
						</label>
						<label htmlFor="ingredient" className="w-30 text-center border border-black rounded-full px-3 py-2 has-checked:bg-black has-checked:text-white">
							<input
								type="radio"
								id="ingredient"
								className="hidden"
								name="filterKind"
								checked={filterItem.currentKind == "ingredient"}
								onChange={() => handleSelect("ingredient", undefined, undefined, "", true)} />
							<span>ingredient</span>
						</label>
					</div>
				</div>
				<div className="h-full flex">
					<FilterTypeLayout setFilterType={setFilterType} />
					<FilterItemLayout currentKind={filterItem.currentKind} filterType={filterType} />
					<FilterSelectedLayout currentKind={filterItem.currentKind} />
				</div>
			</div>
			<div className="absolute bottom-0 right-0 left-0 h-[10%] px-10 border-t-1 border-gray-200 flex items-center bg-white">
				<button
					className="capitalize mr-auto"
					onClick={() => clearFilter()}>
					reset filter
				</button>
				<button className="uppercase py-2 px-4 rounded-full w-30 border border-black bg-white text-black">cancel</button>
				<button
					className="uppercase py-2 px-4 rounded-full w-30 ml-3 bg-black text-white"
					onClick={() => navigation("result")}>
					apply</button>
			</div>
		</div>
	);
}
