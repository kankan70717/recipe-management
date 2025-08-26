import { faCircleQuestion, faLayerGroup, faStore, faTriangleExclamation, faTruck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { TypeIngredientData } from "../../../types/recipe/TypeIngredientData";

export function ModalFormResourceResultIngredient({
	detailData,
}: {
	detailData: TypeIngredientData;
}) {
	return (
		<div className="flex-2/3 border-l-1 border-gray-200 pl-5 overflow-scroll">
			<div className="flex gap-5">
				<div className="flex items-center aspect-square w-2/5">
					{
						typeof detailData.image === "string" &&
						(<img src={detailData.image} />)
					}
				</div>
				<div className="flex-1 flex flex-col gap-1 justify-center">
					<div className="flex items-center justify-between">
						<h3 className="capitalize text-2xl">{detailData?.name}</h3>
					</div>
					<div className="flex flex-wrap gap-3 justify-start">
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