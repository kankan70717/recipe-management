import { useEffect, useState } from "react";
import { useFilter } from "../../../context/FilterContext";
import { fetchRecipe } from "../../../firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faLayerGroup, faPenToSquare, faSliders, faStore, faTruck } from "@fortawesome/free-solid-svg-icons";
import type { TypeIngredientData } from "../../../types/TypeIngredientData";
import ModalLayout from "../../Modal/ModalLayout";

export default function FilterResultLayout() {
	const navigate = useNavigate();
	const context = useFilter();
	if (!context) {
		throw new Error("FilterContext must be used within a FilterProvider");
	}
	const { filterItem } = context;

	const [recipeData, setRecipeData] = useState<TypeIngredientData[] | null>(null);
	const [detailData, setDetailData] = useState<TypeIngredientData>({
		docID: "",
		id: "",
		status: "active",
		store: "",
		kind: "ingredient",
		name: "",
		nameJa: "",
		searchKeywords: [],
		category: "",
		image: "",
		vendor: "",
		purchasePrice: 0,
		purchaseQuantity: 0,
		purchaseUnit: "",
		usageUnit: "",
		unitConversionRate: 0,
		yieldRate: 0,
		tag: [],
		allergenForFilter: {},
		dishRefs: [],
		prepRefs: [],
		updatePerson: "",
		updateDate: {
			seconds: 0,
			nanoseconds: 0,
		},
		createdDate: {
			seconds: 0,
			nanoseconds: 0,
		}
	});

	const [isOpen, setIsOpen] = useState(false);

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

	return (
		<div className="relative pt-6 px-6">
			<h2 className="text-2xl flex items-center gap-2">
				<Link to="/search"
					className="capitalize">
					{filterItem.currentKind}
				</Link>
				<FontAwesomeIcon icon={faAngleRight} className="" />
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
									htmlFor={item.id}
									className="flex items-center gap-2 p-2 border-b-1 border-gray-200 has-checked:bg-gray-200">
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
							))
						)
					}
				</div>
				{
					!recipeData ? ""
						: recipeData?.length === 0 ? ""
							: filterItem.currentKind == "ingredient" ?
								(
									<div className="flex-2/3 border-l-1 border-gray-200 pl-5 overflow-scroll">
										<div className="flex gap-5">
											<div className="flex items-center aspect-square w-2/5">
												{
													typeof detailData.image === "string" &&
													(<img src={detailData.image} />)
												}
											</div>
											<div className="flex-1 flex flex-col gap-3 justify-center">
												<div className="flex items-center justify-between">
													<h3 className="capitalize text-3xl">{detailData?.name}</h3>
													<FontAwesomeIcon
														icon={faPenToSquare}
														size="xl"
														className="ml-10"
														onClick={() => setIsOpen(true)} />
												</div>
												<div className="flex flex-wrap gap-5 justify-start">
													<div className="capitalize flex items-center gap-1">
														<FontAwesomeIcon icon={faLayerGroup} />
														<span>{detailData.category}</span>
													</div>
													<div className="capitalize flex items-center gap-1">
														<FontAwesomeIcon icon={faStore} />
														{detailData?.store}
													</div>
													<div className="capitalize flex items-center gap-1">
														<FontAwesomeIcon icon={faTruck} />
														{detailData?.vendor}
													</div>
												</div>
												<table className="w-full border-separate border-spacing-x-3">
													<tbody>
														<tr>
															<th className="capitalize text-left">purchasePrice:</th>
															<td className="lowercase w-40">${detailData?.purchasePrice}</td>
														</tr>
														<tr>
															<th className="capitalize text-left">purchaseQuantity:</th>
															<td className="lowercase">{detailData?.purchaseQuantity}</td>
														</tr>
														<tr><th className="capitalize text-left">purchaseUnit:</th>
															<td className="lowercase">{detailData?.purchaseUnit}</td>
														</tr>
														<tr><th className="capitalize text-left">unitConversionRate:</th>
															<td className="lowercase">{detailData?.unitConversionRate}</td>
														</tr>
														<tr><th className="capitalize text-left">usageUnit:</th>
															<td className="lowercase">{detailData?.usageUnit}</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
										<div className="mt-3 flex flex-col gap-2">
											<h4 className="capitalize text-2xl">allergen</h4>
											<div className="flex flex-wrap gap-2">
												{
													Object.entries(detailData?.allergenForFilter ?? {}).map(([allergen, status]) => {
														let elements = [];
														if (status == "contained" || status == "removable") {
															elements.push(<span
																key={allergen}
																className="rounded-full bg-gray-200 px-4 py-2 capitalize text-sm">
																{allergen}
															</span>);
														}
														return elements;
													})
												}
											</div>
										</div>
										<div className="mt-3 flex flex-col gap-2">
											<h4 className="capitalize text-2xl">tag</h4>
											<div className="flex flex-wrap gap-2">
												{
													detailData.tag.map((tag) => (
														<span className="rounded-full bg-gray-200 px-4 py-2 capitalize text-sm">{tag}</span>
													))
												}
											</div>
										</div>
									</div>
								) : ""
				}
			</div>
			<ModalLayout isOpen={isOpen} setIsOpen={setIsOpen} detailData={detailData} />
		</div>
	);
}