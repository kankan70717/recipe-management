import { useEffect, useState } from "react";
import { useFilter } from "../../../context/FilterContext";
import { fetchRecipeSnapshot } from "../../../firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faSliders } from "@fortawesome/free-solid-svg-icons";
import type { TypeIngredientData } from "../../../types/recipe/TypeIngredientData";
import ModalLayout from "../../../components/Modal/ModalFormLayout";
import { initialIngredientData } from "../../../constants/initialIngredientData";
import type { TypeFilterKind } from "../type/TypeFilter";
import type { TypePrepData } from "../../../types/recipe/TypePrepData";
import type { TypeDishData } from "../../../types/recipe/TypeDishData";
import { FilterResultIngredient } from "./FilterResultIngredient";
import { FilterResultPrep } from "./FilterResultPrep";
import { useAuth } from "../../../context/AuthContext";
import { FilterResultDish } from "./FilterResultDish";

export default function FilterResultLayout() {
	const navigate = useNavigate();
	const context = useFilter();
	if (!context) {
		throw new Error("FilterContext must be used within a FilterProvider");
	}
	const { filterItem } = context;

	const [recipeData, setRecipeData] = useState<(TypeIngredientData | TypePrepData | TypeDishData)[] | null>(null);
	const [detailData, setDetailData] = useState<TypeIngredientData | TypePrepData | TypeDishData>(initialIngredientData);
	const [formState, setFormState] = useState<{
		isFormOpen: boolean;
		kind: TypeFilterKind | undefined
	}>({
		isFormOpen: false,
		kind: undefined
	});
	const { state } = useAuth();
	useEffect(() => {
		const unsub = fetchRecipeSnapshot(filterItem.currentKind, filterItem, setRecipeData, setDetailData, state.claims?.store);

		return () => unsub();
	}, [filterItem]);

	return (
		<div className="relative pt-6 px-6">
			<h2 className="text-xl flex items-center gap-2">
				<Link to="/search"
					className="capitalize">
					{filterItem.currentKind}
				</Link>
				<FontAwesomeIcon icon={faAngleRight} size="2xs" />
				Filter Result
			</h2>
			<div className="flex items-center gap-2 flex-wrap mt-3">
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
				<div className="flex items-center justify-center ml-auto p-1 rounded-full border-1 border-black w-10 h-10">
					<FontAwesomeIcon icon={faSliders} onClick={() => navigate(-1)} />
				</div>
			</div>
			<div className="flex h-[78svh] mt-3 border-t-1 border-gray-200">
				<div className="flex-1/3 flex flex-col overflow-scroll">
					{
						!recipeData ? (
							<p>Loading...</p>
						) : recipeData.length === 0 ? (
							<p>No recipes found.</p>
						) : (
							recipeData.map((item, index) => (
								<label
									key={index}
									className="flex items-center gap-2 p-2 border-b-1 border-gray-200 has-checked:bg-gray-200">
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
										checked={detailData.id == item.id}
										onChange={() => {
											setDetailData(structuredClone(item));
										}} />
								</label>
							))
						)
					}
				</div>
				{
					!recipeData ? ""
						: recipeData?.length === 0 ? ""
							: filterItem.currentKind == "ingredient" ?
								<FilterResultIngredient
									detailData={detailData as TypeIngredientData}
									setFormState={setFormState} />
								: filterItem.currentKind == "prep" ?
									<FilterResultPrep
										detailData={detailData as TypePrepData}
										setFormState={setFormState} />
									: filterItem.currentKind == "dish" ?
										<FilterResultDish
											detailData={detailData as TypeDishData}
											setFormState={setFormState} /> : ""
				}
			</div>
			<ModalLayout
				formState={formState}
				setFormState={setFormState}
				detailData={detailData}
				cucd="update" />
		</div>
	);
}