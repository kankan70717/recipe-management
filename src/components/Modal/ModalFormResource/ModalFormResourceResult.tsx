import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useFilter } from "../../../context/FilterContext";
import type { TypeIngredientData } from "../../../types/recipe/TypeIngredientData";
import type { TypePrepData } from "../../../types/recipe/TypePrepData";
import type { TypeDishData } from "../../../types/recipe/TypeDishData";
import { initialIngredientData } from "../../../constants/initialIngredientData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ModalFormResourceResultIngredient } from "./ModalFormResourceResultIngredient";
import { ModalFormResourceResultPrep } from "./ModalFormResourceResultPrep";
import { useFormHandlers } from "../ModalFormHandlers/ModalFormHandlers";
import { fetchRecipeSnapshot } from "../../../firebase/firestore";

export default function ModalFormResourceResult(
	{
		setShowResourceResult,
		formData,
		setFormData
	}: {
		setShowResourceResult: Dispatch<SetStateAction<boolean>>;
		formData: TypeDishData | TypePrepData | TypeIngredientData;
		setFormData: Dispatch<SetStateAction<TypeDishData | TypePrepData>>;
	}
) {
	const context = useFilter();
	if (!context) {
		throw new Error("FilterContext must be used within a FilterProvider");
	}
	const { filterItem } = context;

	const [recipeData, setRecipeData] = useState<(TypeIngredientData | TypePrepData | TypeDishData)[] | null>(null);
	const [detailData, setDetailData] = useState<TypeIngredientData | TypePrepData | TypeDishData>(initialIngredientData);
	console.log("formData", formData);

	useEffect(() => {
		const unsub = fetchRecipeSnapshot(filterItem.currentKind, filterItem, setRecipeData, setDetailData);

		return () => unsub();
	}, [filterItem]);

	const {
		handleResource,
		handleResourceUsageAmount
	} = useFormHandlers(setFormData);

	return (
		<div className={`absolute inset-0 rounded-lg p-5 bg-white flex flex-col`}>
			<h2 className="text-lg flex items-center gap-2">
				<div className="capitalize">
					{filterItem.currentKind}
				</div>
				<FontAwesomeIcon icon={faAngleRight} size="2xs" />
				Filter Result
				<div className="flex items-center justify-center ml-auto p-1 w-10 h-10">
					<FontAwesomeIcon icon={faXmark} onClick={() => setShowResourceResult(false)} />
				</div>
			</h2>
			<div className="flex items-center gap-2 flex-wrap">
				<div>Filtered by:</div>
				<div className="flex gap-2 flex-wrap">
					{
						Object.entries(filterItem[filterItem.currentKind].allergen).map(([allergenCategory, obj]) => {
							let elements = [];
							if (obj.allSelected) {
								elements.push(<span
									key={allergenCategory}
									className="rounded-full bg-red-300 px-4 py-2 capitalize text-sm">
									All {allergenCategory}
								</span>);
							} else {
								Object.entries(filterItem[filterItem.currentKind].allergen[allergenCategory].items).map(([allergenName, selected]) => {
									if (selected) {
										elements.push(<span
											key={allergenName}
											className="rounded-full bg-red-300 px-4 py-2 capitalize text-sm">
											{allergenName}
										</span>);
									}
								})
							}
							return elements;
						})
					}
					{
						Object.entries(filterItem[filterItem.currentKind].category).map(([category, selected]) => {
							let elements = [];
							if (selected) {
								elements.push(<span
									key={category}
									className="rounded-full bg-gray-200 px-4 py-2 capitalize text-sm">
									{category}
								</span>);
							}
							return elements;
						})
					}
					{
						Object.entries(filterItem[filterItem.currentKind].tag).map(([tag, selected]) => {
							let elements = [];
							if (selected) {
								elements.push(<span
									key={tag}
									className="rounded-full bg-gray-200 px-4 py-2 capitalize text-sm">
									{tag}
								</span>);
							}
							return elements;
						})
					}
				</div>
			</div>
			<div className="grow flex mt-3 border-t-1 border-gray-200 h-[calc(100svh-21rem)]">
				<div className="flex-1/2 flex flex-col overflow-scroll">
					{
						!recipeData ? (
							<p>Loading...</p>
						) : recipeData.length === 0 ? (
							<p>No recipes found.</p>
						) : (
							recipeData.map((item, index) => (
								<div key={index} className="flex items-center border-b-1 border-gray-200">
									<label
										key={index}
										htmlFor={item.id}
										className="grow flex items-center gap-2 p-2 has-checked:bg-gray-200 peer">
										{
											typeof item.image === "string" &&
											(<img
												src={item.image ? item.image : "/src/assets/noImage.jpg"}
												className="h-20 aspect-square object-cover" />)
										}
										<h2 className="capitalize">{item.name}</h2>
										<input
											type="radio"
											id={item.id}
											name="filterResult"
											className="hidden"
											checked={detailData?.id == item.id}
											onChange={() => setDetailData(item)} />
									</label>
									<div className="h-full flex gap-2 flex-col justify-center items-center px-2 w-25">
										<div>
											<label htmlFor={item.docID + "_add"} className="capitalize py-1 px-2">
												{
													formData.kind === "prep" || formData.kind === "dish"
														? Object.keys((formData as TypePrepData | TypeDishData).resources).some(
															(resourceID) => resourceID === item.docID
														)
															? (<FontAwesomeIcon icon={faXmark} />)
															: (<FontAwesomeIcon icon={faPlus} />)
														: null
												}
											</label>
											<input
												type="checkbox"
												id={item.docID + "_add"}
												className="hidden"
												defaultChecked={
													formData.kind === "prep" || formData.kind === "dish"
														? Object.keys((formData as TypePrepData | TypeDishData).resources).some(
															(resourceID) => resourceID === item.docID
														)
														: false
												}
												onChange={(e) => handleResource(e, item as TypeIngredientData | TypePrepData)} />
										</div>
										{
											formData.kind === "prep" || formData.kind === "dish"
												? Object.keys((formData as TypePrepData | TypeDishData).resources).some(
													(resourceID) => resourceID === item.docID
												)
													? (
														<>
															<label htmlFor="resourceUsageAmount" className="text-xs">usageAmount</label>
															<input
																type="number"
																id="resourceUsageAmount"
																name="usageAmount"
																value={(formData as TypePrepData | TypeDishData).resources[item.docID].usageAmount}
																className="text-right border border-black rounded w-15"
																onChange={(e) => handleResourceUsageAmount(item.docID, e)} />
														</>)
													: null
												: null
										}
									</div>
								</div>
							))
						)
					}
				</div>
				{
					!recipeData ? ""
						: recipeData?.length === 0 ? ""
							: filterItem.currentKind == "ingredient" ?
								<ModalFormResourceResultIngredient
									detailData={detailData as TypeIngredientData} />
								: filterItem.currentKind == "prep" ?
									<ModalFormResourceResultPrep
										detailData={detailData as TypePrepData} />
									: ""
				}
			</div>
		</div>
	);
}