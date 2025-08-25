import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useFilter } from "../../context/FilterContext";
import type { TypeIngredientData } from "../../types/recipe/TypeIngredientData";
import type { TypePrepData } from "../../types/recipe/TypePrepData";
import type { TypeDishData } from "../../types/recipe/TypeDishData";
import { initialIngredientData } from "../../constants/initialIngredientData";
import { fetchRecipe } from "../../firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ModalFormResultIngredient } from "./ModalFormResultIngredient";

export default function ModalFormResourceResult(
	{
		setShowResourceResult,
		formData,
		setFormData
	}: {
		setShowResourceResult: Dispatch<SetStateAction<boolean>>;
		formData: TypeDishData | TypePrepData | TypeIngredientData;
		setFormData: Dispatch<SetStateAction<TypeDishData | TypePrepData | TypeIngredientData>>;
	}
) {
	const context = useFilter();
	if (!context) {
		throw new Error("FilterContext must be used within a FilterProvider");
	}
	const { filterItem } = context;

	const [recipeData, setRecipeData] = useState<TypeIngredientData[] | TypePrepData[] | TypeDishData[] | null>(null);
	const [detailData, setDetailData] = useState<TypeIngredientData | TypePrepData | TypeDishData>(initialIngredientData);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchRecipe(filterItem.currentKind, filterItem);
				console.log(data);
				setRecipeData(data as TypeIngredientData[]);
				setDetailData(data[0] as TypeIngredientData);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	const handleResource = (e: React.ChangeEvent<HTMLInputElement>, item: TypeIngredientData | TypePrepData | TypeDishData) => {
		console.log("item", item);
		const updatedFormData = { ...formData }
		if (e.target.checked) {

		}
	}

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
			<div className="flex mt-3 border-t-1 border-gray-200 h-[calc(100svh-24rem)]">
				<div className="flex-1/3 flex flex-col overflow-scroll">
					{
						!recipeData ? (
							<p>Loading...</p>
						) : recipeData.length === 0 ? (
							<p>No recipes found.</p>
						) : (
							recipeData.map((item, index) => (
								<div className="flex items-center">
									<label
										key={index}
										htmlFor={item.id}
										className="grow flex items-center gap-2 p-2 has-checked:bg-gray-200 peer">
										{
											typeof item.image === "string" &&
											(<img
												src={item.image}
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
									<label className="h-full flex items-center px-2">
										<input
											type="checkbox"
											onChange={(e) => handleResource(e, item)} />
									</label>
								</div>
							))
						)
					}
				</div>
				{
					!recipeData ? ""
						: recipeData?.length === 0 ? ""
							: filterItem.currentKind == "ingredient" ?
								<ModalFormResultIngredient
									detailData={detailData as TypeIngredientData} />
								: ""
				}
			</div>
			<div className="absolute bottom-0 left-0 w-full py-2  px-10 border-t-1 border-gray-200 flex items-center bg-white">
				<button className="capitalize mr-auto">reset filter</button>
				<button
					className="uppercase py-2 px-4 rounded-full w-30 border border-black bg-white text-black"
					onClick={() => { setShowResourceResult(false) }}>
					cancel
				</button>
				<button
					className="uppercase py-2 px-4 rounded-full w-30 ml-3 bg-black text-white"
					onClick={() => setShowResourceResult(false)}>
					apply</button>
			</div>
		</div>
	);
}