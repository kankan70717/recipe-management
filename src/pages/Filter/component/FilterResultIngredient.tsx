import { faCircleChevronRight, faCircleQuestion, faLayerGroup, faPenToSquare, faStore, faTriangleExclamation, faTruck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { TypeIngredientData } from "../../../types/recipe/TypeIngredientData";
import type { TypeFilterKind } from "../type/TypeFilter";
import { useState, type Dispatch, type SetStateAction } from "react";
import { deleteRecipe } from "../../../firebase/firestore";

export function FilterResultIngredient({
	detailData,
	setFormState
}: {
	detailData: TypeIngredientData;
	setFormState: Dispatch<SetStateAction<{
		isFormOpen: boolean;
		kind: TypeFilterKind | undefined
	}>>
}) {
	const [isDeleting, setIsDeleting] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	console.log("detailData", detailData);

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			const result = await deleteRecipe(detailData);
			if (!result) {
				alert("Recipe not found. It may have already been deleted.");
			} else {
				alert("Recipe deleted successfully!");
				setShowConfirm(false);
			}
		} catch (err) {
			console.error(err);
			alert("Failed to delete recipe.");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="flex-2/3 border-l-1 border-gray-200 pl-5 overflow-scroll">
			<div className="flex gap-5 pt-5">
				<div className="flex items-center aspect-square w-2/5">
					{
						typeof detailData.image === "string" &&
						(<img 
							src={detailData.image ? detailData.image : "/src/assets/noImage.jpg"}
							className="w-full h-full object-cover" />)
					}
				</div>
				<div className="flex-1 flex flex-col gap-3 justify-center">
					<div className="flex items-center justify-between">
						<h3 className="capitalize text-xl">{detailData?.name}</h3>
						<FontAwesomeIcon
							icon={faPenToSquare}
							size="xl"
							className="ml-10"
							onClick={() => setFormState({
								isFormOpen: true,
								kind: "ingredient"
							})} />
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
					<table className="w-full border-separate">
						<tbody>
							<tr>
								<th className="capitalize text-left">purchasePrice:</th>
								<td className="lowercase w-30">${detailData?.purchasePrice}</td>
							</tr>
							<tr>
								<th className="capitalize text-left">purchaseQuantity:</th>
								<td className="lowercase">{detailData?.purchaseQuantity}</td>
							</tr>
							<tr>
								<th className="capitalize text-left">purchaseUnit:</th>
								<td className="lowercase">{detailData?.purchaseUnit}</td>
							</tr>
							<tr>
								<th className="capitalize text-left">usageUnit:</th>
								<td className="lowercase">{detailData?.usageUnit}</td>
							</tr>
							<tr>
								<th className="capitalize text-left">yieldRate (%):</th>
								<td className="lowercase">{detailData?.yieldRate}</td>
							</tr>
							<tr>
								<th className="capitalize text-left">unitConversionRate:</th>
								<td className="lowercase">{detailData?.unitConversionRate}</td>
							</tr>
							<tr>
								<th className="capitalize text-left">costPerUsageUnit ($):</th>
								<td className="lowercase">{detailData.costPerUsageUnit}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div className="mt-3 flex flex-col gap-2">
				<h4 className="capitalize text-2xl">allergen</h4>
				<div className="flex flex-col gap-2">
					<div className="flex gap-2">
						{
							Object.entries(detailData.allergen ?? {}).map(([allergenCategoryName, allergenCategoryObj]) => {
								let elements = [];
								if (allergenCategoryObj.status == "contained") {
									elements.push(
										<div
											key={allergenCategoryName}
											className={
												`flex items-center justify-start gap-2 rounded-full px-4 py-1 capitalize text-sm font-bold
												${allergenCategoryObj.status == "contained"
													? "border-2 border-red-500"
													: allergenCategoryObj.status == "mayContained"
														? "border-2 border-yellow-500"
														: allergenCategoryObj.status == "removable"
															? "border-2 border-green-500"
															: ""}`}>
											{
												allergenCategoryObj.status == "contained"
													? <FontAwesomeIcon icon={faXmark} size="lg" className="text-red-500" />
													: ""
											}
											<span>
												{allergenCategoryName}
											</span>
										</div>
									);
								} else {
									Object.entries(allergenCategoryObj.items ?? {}).forEach(([allergenName, allergenObj]) => {
										if (allergenObj.status == "contained") {
											elements.push(
												<div
													key={allergenName}
													className={
														`flex items-center justify-start gap-2 rounded-full px-4 py-1 capitalize text-sm font-bold
														${allergenObj.status == "contained"
															? "border-2 border-red-500"
															: allergenObj.status == "mayContained"
																? "border-2 border-yellow-500"
																: allergenObj.status == "removable"
																	? "border-2 border-green-500"
																	: ""}`}>
													{
														allergenObj.status == "contained"
															? <FontAwesomeIcon icon={faXmark} size="lg" className="text-red-500" />
															: ""
													}
													<span>
														{allergenName}
													</span>
												</div>
											);
										}
									})
								}
								return elements;
							})
						}
					</div>
					<div className="flex gap-2">
						{
							Object.entries(detailData.allergen ?? {}).map(([allergenCategoryName, allergenCategoryObj]) => {
								let elements = [];
								if (allergenCategoryObj.status == "mayContained") {
									elements.push(
										<div
											key={allergenCategoryName}
											className={
												`flex items-center justify-start gap-2 rounded-full px-4 py-1 capitalize text-sm font-bold
												${allergenCategoryObj.status == "mayContained"
													? "border-2 border-yellow-500"
													: allergenCategoryObj.status == "removable"
														? "border-2 border-green-500"
														: ""}`}>
											{
												allergenCategoryObj.status == "mayContained"
													? <FontAwesomeIcon icon={faTriangleExclamation} size="lg" className="text-yellow-500" />
													: ""
											}
											<span>
												{allergenCategoryName}
											</span>
										</div>
									);
								} else {
									Object.entries(allergenCategoryObj.items ?? {}).forEach(([allergenName, allergenObj]) => {
										if (allergenObj.status == "mayContained") {
											elements.push(
												<div
													key={allergenName}
													className={
														`flex items-center justify-start gap-2 rounded-full px-4 py-1 capitalize text-sm font-bold
														${allergenObj.status == "mayContained"
															? "border-2 border-yellow-500"
															: allergenObj.status == "removable"
																? "border-2 border-green-500"
																: ""}`}>
													{
														allergenObj.status == "mayContained"
															? <FontAwesomeIcon icon={faTriangleExclamation} size="lg" className="text-yellow-500" />
															: ""
													}
													<span>
														{allergenName}
													</span>
												</div>
											);
										}
									})
								}
								return elements;
							})
						}
					</div>
					<div className="flex gap-2">
						{
							Object.entries(detailData.allergen ?? {}).map(([allergenCategoryName, allergenCategoryObj]) => {
								let elements = [];
								if (allergenCategoryObj.status == "removable") {
									elements.push(
										<div
											key={allergenCategoryName}
											className={
												`flex items-center justify-start gap-2 rounded-full px-4 py-1 capitalize text-sm font-bold
												${allergenCategoryObj.status == "removable"
													? "border-2 border-green-500"
													: ""}`}>
											{
												allergenCategoryObj.status == "removable"
													? <FontAwesomeIcon icon={faCircleQuestion} size="lg" className="text-green-500" />
													: ""
											}
											<span>
												{allergenCategoryName}
											</span>
										</div>
									);
								} else {
									Object.entries(allergenCategoryObj.items ?? {}).forEach(([allergenName, allergenObj]) => {
										if (allergenObj.status == "removable") {
											elements.push(
												<div
													key={allergenName}
													className={
														`flex items-center justify-start gap-2 rounded-full px-4 py-1 capitalize text-sm font-bold
														${allergenObj.status == "removable"
															? "border-2 border-green-500"
															: ""}`}>
													{
														allergenObj.status == "removable"
															? <FontAwesomeIcon icon={faTriangleExclamation} size="lg" className="text-green-500" />
															: ""
													}
													<span>
														{allergenName}
													</span>
												</div>
											);
										}
									})
								}
								return elements;
							})
						}
					</div>
				</div>
			</div>
			<div className="mt-3 flex flex-col gap-2">
				<h4 className="capitalize text-2xl">tag</h4>
				{detailData.tag.length !== 0 && (
					<div className="flex flex-wrap gap-2">
						{detailData.tag.map((tag) => (
							<span
								key={tag}
								className="rounded-full bg-gray-200 px-4 py-2 capitalize text-sm">
								{tag}
							</span>
						))}
					</div>
				)}
			</div>
			<div>
				<h4 className="capitalize text-2xl">related recipe</h4>
				<div className="flex flex-col">
					{
						detailData.prepRefs
						&& Object.entries(detailData.prepRefs).map(([relatedRecipeID, relatedRecipeObj]) => (
							<div key={relatedRecipeID} className="flex items-center gap-3 py-1 border-b-gray-200 border-b-1">
								<img src={relatedRecipeObj.image} className="h-10 w-10 rounded-full object-cover" />
								<span className="capitalize text-sm">{relatedRecipeObj.name}</span>
								<FontAwesomeIcon icon={faCircleChevronRight} />
							</div>
						))
					}
				</div>
			</div>
			<div className="text-right">
				<button
					onClick={() => setShowConfirm(true)}
					className="px-4 py-2 bg-black text-white rounded-full">
					Delete
				</button>

				{showConfirm && (
					<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
						<div className="bg-white p-6 rounded-lg shadow-lg text-center">
							<p className="mb-4">Are you sure you want to delete this recipe?</p>
							<div className="flex justify-center gap-4">
								<button
									onClick={handleDelete}
									disabled={isDeleting}
									className="px-4 py-2 bg-black text-white rounded-full disabled:opacity-50"
								>
									{isDeleting ? "Deleting..." : "Yes, Delete"}
								</button>
								<button
									onClick={() => setShowConfirm(false)}
									className="px-4 py-2 bg-gray-300 rounded-full"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}