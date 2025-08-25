import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { TypeFilterType } from "../Filter/types";
import { useFilter } from "../../context/FilterContext";
import { FilterTypeLayout } from "../Filter/Layout/FilterTypeLayout";
import { FilterItemLayout } from "../Filter/Layout/FilterItemLayout";
import { FilterSelectedLayout } from "../Filter/Layout/FilterSelectedLayout";
import ModalFormResourceResult from "./ModalFormResourceResult";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { TypePrepData } from "../../types/recipe/TypePrepData";
import type { TypeDishData } from "../../types/recipe/TypeDishData";
import type { TypeIngredientData } from "../../types/recipe/TypeIngredientData";

export default function ModalFormResourceFilter({
	setShowFilter,
	formData,
	setFormData
}: {
	setShowFilter: Dispatch<SetStateAction<boolean>>;
	formData: TypeDishData | TypePrepData | TypeIngredientData;
	setFormData: Dispatch<SetStateAction<TypeDishData | TypePrepData | TypeIngredientData>>;
}) {
	const [filterType, setFilterType] = useState<TypeFilterType>("allergen");
	const [showResourceResult, setShowResourceResult] = useState(false);

	const context = useFilter();
	if (!context) {
		throw new Error("FilterContext must be used within a FilterProvider");
	}
	const { filterItem, handleSelect } = context;
	useEffect(() => {
		handleSelect("prep", undefined, undefined, "", true);
	}, []);

	return (
		<div className={`absolute inset-0 rounded-lg m-10 pt-5 px-5 ${showResourceResult ? "bg-black/50" : "bg-white"}`}>
			<div className="pt-5 px-6 h-[90%]">
				<div className="flex items-center mb-5">
					<h2 className="capitalize text-2xl mr-5">search</h2>
					<div className="capitalize flex gap-2">
						<label htmlFor="prep" className="w-30 text-center border border-black rounded-full px-2 py-1 has-checked:bg-black has-checked:text-white">
							<input
								type="radio"
								id="prep"
								className="hidden"
								name="filterKind"
								checked={filterItem.currentKind == "prep"}
								onChange={() => handleSelect("prep", undefined, undefined, "", true)} />
							<span>prep</span>
						</label>
						<label htmlFor="ingredient" className="w-30 text-center border border-black rounded-full px-2 py-1 has-checked:bg-black has-checked:text-white">
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
					<FontAwesomeIcon icon={faXmark} size="xl" className="ml-auto" onClick={() => setShowFilter(false)} />
				</div>
				<div className="flex h-[90%]">
					<FilterTypeLayout setFilterType={setFilterType} />
					<FilterItemLayout currentKind={filterItem.currentKind} filterType={filterType} />
					<FilterSelectedLayout currentKind={filterItem.currentKind} />
				</div>
			</div>
			<div className="h-[10%] px-10 border-t-1 border-gray-200
			flex items-center">
				<button className="capitalize mr-auto">reset filter</button>
				<button
					className="uppercase py-2 px-4 rounded-full w-30 border border-black bg-white text-black"
					onClick={() => { setShowFilter(false) }}>
					cancel
				</button>
				<button
					className="uppercase py-2 px-4 rounded-full w-30 ml-3 bg-black text-white"
					onClick={() => setShowResourceResult(prev => !prev)}>
					apply</button>
			</div>
			{
				showResourceResult
				&& <ModalFormResourceResult
					setShowResourceResult={setShowResourceResult}
					formData={formData}
					setFormData={setFormData as Dispatch<SetStateAction<TypeDishData | TypePrepData | TypeIngredientData>>} />
			}
		</div>
	);
}
