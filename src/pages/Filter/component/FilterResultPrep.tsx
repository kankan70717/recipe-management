import { faCircleQuestion, faLayerGroup, faPenToSquare, faStore, faTriangleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { TypeFilterKind } from "../type/TypeFilter";
import type { Dispatch, SetStateAction } from "react";
import type { TypePrepData } from "../../../types/recipe/TypePrepData";

export function FilterResultPrep({
	detailData,
	setFormState
}: {
	detailData: TypePrepData;
	setFormState: Dispatch<SetStateAction<{
		isFormOpen: boolean;
		kind: TypeFilterKind | undefined
	}>>
}) {
	return (
		<div className="flex-2/3 border-l-1 border-gray-200 pl-5 overflow-scroll">
			<div className="flex gap-5">
				<div className="flex items-center aspect-square w-2/5">
					{
						typeof detailData.image === "string" &&
						(<img src={detailData.image ? detailData.image : "/src/assets/noImage.jpg"} />)
					}
				</div>
				<div className="flex-1 flex flex-col gap-3 justify-center">
					<div className="flex items-center justify-center">
						<h3 className="capitalize text-3xl">{detailData.name}</h3>
						<FontAwesomeIcon
							icon={faPenToSquare}
							size="xl"
							className="ml-10"
							onClick={() => setFormState({
								isFormOpen: true,
								kind: "prep"
							})} />
					</div>
					<div className="flex flex-wrap gap-5 justify-center">
						<div className="capitalize flex items-center gap-1">
							<FontAwesomeIcon icon={faLayerGroup} />
							<span>{detailData.category}</span>
						</div>
						<div className="capitalize flex items-center gap-1">
							<FontAwesomeIcon icon={faStore} />
							{detailData?.store}
						</div>
					</div>
					<table className="w-full border-separate border-spacing-x-3">
						<tbody>
							<tr>
								<th className="capitalize text-left">finishedAmount:</th>
								<td className="lowercase w-40">{detailData.finishedAmount}</td>
							</tr>
							<tr>
								<th className="capitalize text-left">usageUnit:</th>
								<td className="lowercase">{detailData.usageUnit}</td>
							</tr>
							<tr><th className="capitalize text-left">costPerUsageUnit:</th>
								<td className="lowercase">{detailData.costPerUsageUnit}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div className="mt-3 flex flex-col gap-2">
				<h4 className="capitalize text-lg font-bold">instruction</h4>
				<div className="px-2">
					{detailData.instruction}
				</div>
			</div>
			<div className="mt-3 flex flex-col gap-2">
				<h4 className="capitalize text-lg font-bold">allergen</h4>
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
				<h4 className="capitalize text-lg font-bold">tag</h4>
				<div className="flex flex-wrap gap-2">
					{
						detailData.tag.map((tag) => (
							<span key={tag} className="rounded-full bg-gray-200 px-4 py-2 capitalize text-sm">{tag}</span>
						))
					}
				</div>
			</div>
		</div>
	);
}