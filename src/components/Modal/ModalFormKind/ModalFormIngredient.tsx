import { useState, type Dispatch, type SetStateAction } from "react";
import type { TypeIngredientData } from "../../../types/recipe/TypeIngredientData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faCircleQuestion, faTags, faTriangleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import { useFormHandlers } from "../ModalFormHandlers/ModalFormHandlers";
import { useSetting } from "../../../context/SettingsContext";


export function ModalFormIngredient({
	cucd,
	formData,
	setFormData
}: {
	cucd: "update" | "create" | "delte" | "read";
	formData: TypeIngredientData;
	setFormData: Dispatch<SetStateAction<TypeIngredientData>>;
}

) {
	const [tagInput, setTagInput] = useState<string>("");
	const [isAllergenOpen, setAllergenOpen] = useState(false);
	const [isTagOpen, setTagOpen] = useState(false);

	const { setting } = useSetting();

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "contained":
				return <FontAwesomeIcon icon={faXmark} size="lg" className="text-red-500 ml-auto" />;
			case "mayContained":
				return <FontAwesomeIcon icon={faTriangleExclamation} size="lg" className="text-yellow-500 ml-auto" />;
			case "notContained":
				return <FontAwesomeIcon icon={faCircleRegular} size="lg" className="text-blue-500 ml-auto" />;
			case "removable":
				return <FontAwesomeIcon icon={faCircleQuestion} size="lg" className="text-green-500 ml-auto" />;
			default:
				return null;
		}
	};

	const getStatusClass = (status: string) => {
		switch (status) {
			case "contained":
				return "bg-red-200";
			case "mayContained":
				return "bg-yellow-200";
			case "notContained":
				return "bg-blue-200";
			case "removable":
				return "bg-green-200";
			default:
				return "";
		}
	};

	const {
		handleTextChange,
		handleImageChange,
		handleSelectChange,
		handleTagChange,
		handleAllergenCategoryChange,
		handleAllergenItemChange
	} = useFormHandlers(setFormData);

	return (
		<table className="border-separate border-spacing-y-3 border-spacing-x-5 w-full h-full mb-3">
			<tbody>
				<tr>
					<td className="w-1/2 text-center">
						<div className="flex items-center justify-center w-full aspect-square mb-5 border border-black">
							{formData.image instanceof File ? (
								<img
									src={formData.image ? URL.createObjectURL(formData.image) : "/src/assets/noImage.jpg"}
									className="object-cover"
								/>
							) : (
								<img
									src={formData.image || "/src/assets/noImage.jpg"}
								/>
							)}
						</div>
						<label className="capitalize border border-black rounded-full py-1 px-3">
							<span>upload image</span>
							<input type="file" accept="image/*" className="hidden" name="image" onChange={(e) => handleImageChange(e)} />
						</label>
					</td>
					<td className="w-1/2">
						<table className="border-separate border-spacing-3 overflow-scroll">
							<tbody>
								<tr>
									<th className="capitalize">status</th>
									<td>
										<select
											className={`capitalize w-full py-1 border rounded-md px-2 ${cucd == "update" ? "bg-gray-200 border-gray-500" : "border-black"}`}
											id="status"
											name="status"
											defaultValue={formData.status}
											onChange={(e) => handleSelectChange(e)}>
											<option value="active">active</option>
											<option value="inactive">inactive</option>
											<option value="pending">pending</option>
										</select>
									</td>
								</tr>
								<tr>
									<th><label htmlFor="kind" className="capitalize">kind</label></th>
									<td>
										<select
											className={`capitalize w-full py-1 border rounded-md px-2 bg-gray-200 border-gray-500}`}
											id="kind"
											name="kind"
											defaultValue={formData.kind}
											disabled={true}
											onChange={(e) => handleSelectChange(e)}>
											<option value="dish">dish</option>
											<option value="prep">prep</option>
											<option value="ingredient">ingredient</option>
										</select>
									</td>
								</tr>
								<tr>
									<th><label htmlFor="category" className="capitalize">category</label></th>
									<td>
										<select
											className={`capitalize w-full py-1 border rounded-md px-2`}
											id="category"
											name="category"
											value={formData.category}
											onChange={(e) => handleSelectChange(e)}>
											{
												setting[formData.kind].category.map(item => (
													<option key={item} value={item}>
														{item}
													</option>
												))
											}
										</select>
									</td>
								</tr>
								<tr>
									<th><label htmlFor="nameJa" className="capitalize">nameJa</label></th>
									<td><input type="text" className="lowercase border-black border rounded-md px-2" id="nameJa" name="nameJa" defaultValue={formData.nameJa} onChange={(e) => handleTextChange(e)} /></td>
								</tr>
								<tr>
									<th><label htmlFor="name" className="capitalize">name</label></th>
									<td><input type="text" className="lowercase border-black border rounded-md px-2" id="name" name="name" defaultValue={formData?.name} onChange={(e) => handleTextChange(e)} /></td>
								</tr>
								<tr>
									<th><label htmlFor="store" className="capitalize">store</label></th>
									<td><input type="text" className="lowercase border-black border rounded-md px-2" id="store" name="store" defaultValue={formData.store} onChange={(e) => handleTextChange(e)} /></td>
								</tr>
								<tr>
									<th><label htmlFor="vendor" className="capitalize">vendor</label></th>
									<td><input type="text" className="lowercase border-black border rounded-md px-2" id="vendor" name="vendor" defaultValue={formData.vendor} onChange={(e) => handleTextChange(e)} /></td>
								</tr>
								<tr>
									<th><label htmlFor="purchasePrice" className="capitalize">purchasePrice</label></th>
									<td><input type="number" step={0.01} className="lowercase border-black border rounded-md px-2" id="purchasePrice" name="purchasePrice" defaultValue={formData.purchasePrice} onChange={(e) => handleTextChange(e)} /></td>
								</tr>
								<tr>
									<th><label htmlFor="purchaseQuantity" className="capitalize">purchaseQuantity</label></th>
									<td><input type="number" className="lowercase border-black border rounded-md px-2" id="purchaseQuantity" name="purchaseQuantity" defaultValue={formData.purchaseQuantity} onChange={(e) => handleTextChange(e)} /></td>
								</tr>
								<tr>
									<th><label htmlFor="purchaseUnit" className="capitalize">purchaseUnit</label></th>
									<td><input type="text" className="lowercase border-black border rounded-md px-2" id="purchaseUnit" name="purchaseUnit" defaultValue={formData.purchaseUnit} onChange={(e) => handleTextChange(e)} /></td>
								</tr>
								<tr>
									<th><label htmlFor="usageUnit" className="capitalize">usageUnit</label></th>
									<td><input type="text" className="lowercase border-black border rounded-md px-2" id="usageUnit" name="usageUnit" defaultValue={formData.usageUnit} onChange={(e) => handleTextChange(e)} /></td>
								</tr>
								<tr>
									<th><label htmlFor="yieldRate" className="capitalize">yieldRate (%)</label></th>
									<td><input type="number" className="lowercase border-black border rounded-md px-2" id="yieldRate" name="yieldRate" defaultValue={formData.yieldRate} onChange={(e) => handleTextChange(e)} /></td>
								</tr>
								<tr>
									<th><label htmlFor="unitConversionRate" className="capitalize">unitConversionRate</label></th>
									<td><input type="number" step={0.0001} className="lowercase border-black border rounded-md px-2" id="unitConversionRate" name="unitConversionRate" value={formData.unitConversionRate} onChange={(e) => handleTextChange(e)} /></td>
								</tr>
								<tr>
									<th><label htmlFor="costPerUsageUnit" className="capitalize">costPerUsageUnit ($)</label></th>
									<td><input type="number" className="lowercase bg-gray-200 border-gray-500 border rounded-md px-2" id="costPerUsageUnit" name="costPerUsageUnit" value={formData.costPerUsageUnit} disabled={true} /></td>
								</tr>
								<tr>
									<th><label htmlFor="updateDate" className="capitalize">updateDate</label></th>
									<td>
										<input
											type="text"
											className="lowercase bg-gray-200 border-gray-500 border rounded-md px-2"
											id="updateDate"
											disabled
											defaultValue={
												(() => {
													const ms = formData.updateDate.seconds === 0
														? Date.now()
														: formData.updateDate.seconds * 1000;

													const date = new Date(ms);
													const pad = (n: number) => n.toString().padStart(2, '0');
													return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
												})()
											} />
									</td>
								</tr>
								<tr>
									<th><label htmlFor="createdDate" className="capitalize">createdDate</label></th>
									<td>
										<input
											type="text"
											className="lowercase bg-gray-200 border-gray-500 border rounded-md px-2"
											id="createdDate"
											disabled
											defaultValue={
												(() => {
													const ms = formData.createdDate.seconds === 0
														? Date.now()
														: formData.createdDate.seconds * 1000;

													const date = new Date(ms);
													const pad = (n: number) => n.toString().padStart(2, '0');
													return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
												})()
											} />
									</td>
								</tr>
								<tr>
									<th><label htmlFor="updatePerson" className="capitalize">updatePerson</label></th>
									<td>
										<input
											type="text"
											className="lowercase border rounded-md px-2"
											id="updatePerson"
											name="updatePerson"
											placeholder={formData.updatePerson}
											required
											onChange={(e) => handleTextChange(e)} />
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
				<tr>
					<td colSpan={2}>
						<div className="capitalize font-bold text-xl pb-2 mx-2 flex items-center justify-between border-b-1 border-gray-300"
							onClick={() => setAllergenOpen(prev => !prev)}>
							<span>allergen</span>
							<FontAwesomeIcon icon={faAngleRight} className={`transition-all duration-1000 ease-in-out ${isAllergenOpen && "rotate-90"}`} />
						</div>
						<div className={`grid grid-cols-2 gap-5 mt-3 overflow-hidden transition-all duration-1000 ease-in-out ${isAllergenOpen ? "max-h-[2000px]" : "max-h-0"}`}>{
							Object.entries(formData.allergen ?? {}).map(([allergenCategoryName, allergenCategoryObj]) => (
								<fieldset
									key={`allergen-wrapper-${allergenCategoryName}`}
									className="flex flex-col gap-2 mb-2 border border-gray-400 rounded px-5 py-3">
									<legend className="capitalize text-xl px-2">{allergenCategoryName}</legend>

									{/* Allergen Category */}
									{allergenCategoryName == "other"
										? ""
										: (<div className="flex items-center justify-between gap-2 capitalize">
											<div>{allergenCategoryName}</div>
											{getStatusIcon(allergenCategoryObj.status)}
											<select
												className={`flex items-center gap-1 border border-black rounded capitalize ${getStatusClass(allergenCategoryObj.status)}`}
												value={allergenCategoryObj.status}
												name={allergenCategoryName}
												onChange={(e) => handleAllergenCategoryChange(e, allergenCategoryName)}>
												<option value="contained">contained</option>
												<option value="mayContained">mayContained</option>
												<option value="notContained">notContained</option>
												<option value="removable">removable</option>
												<option value="unknown">unknown</option>
											</select>
										</div>)}

									{/* Items */}
									{Object.entries(allergenCategoryObj.items ?? {}).map(([allergenName, allergenObj]) => (
										<div
											key={`${allergenCategoryName}-${allergenName}`}
											className="flex items-center justify-between gap-2 capitalize">
											<div>{allergenName}</div>
											{getStatusIcon(allergenObj.status)}
											<select
												className={`flex items-center gap-1 border border-black rounded capitalize ${getStatusClass(allergenObj.status)}`}
												value={allergenObj.status}
												name={allergenName}
												onChange={(e) => handleAllergenItemChange(e, allergenCategoryName)}>
												<option value="contained">contained</option>
												<option value="mayContained">mayContained</option>
												<option value="notContained">notContained</option>
												<option value="removable">removable</option>
												<option value="unknown">unknown</option>
											</select>
										</div>
									))}
								</fieldset>
							))
						}
						</div>
					</td>
				</tr>
				<tr>
					<td colSpan={2}>
						<div className="capitalize font-bold text-xl pb-2 mx-2 flex items-center justify-between border-b-1 border-gray-300"
							onClick={() => setTagOpen(prev => !prev)}>
							<span>tag</span>
							<FontAwesomeIcon icon={faAngleRight} className={`transition-all duration-1000 ease-in-out ${isTagOpen && "rotate-90"}`} />
						</div>
						<div className={`flex flex-col gap-3 mt-3 overflow-hidden transition-all duration-1000 ease-in-out ${isTagOpen ? "max-h-[2000px]" : "max-h-0"}`}>
							<div className="text-center">
								<span className="relative">
									<FontAwesomeIcon icon={faTags} className="text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
									<input
										type="text"
										className="border rounded px-10 py-1 w-100 border-gray-400 bg-gray-100 placeholder:text-gray-400" placeholder="add tag ..."
										value={tagInput}
										onChange={(e) => setTagInput(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												const inputValue = (e.target as HTMLInputElement).value;
												if (inputValue.trim() !== "") {
													handleTagChange(inputValue.trim(), "add");
													setTagInput("");
												}
											}
										}} />
								</span>
							</div>
							<div className="flex flex-wrap gap-3">
								{
									formData.tag.map((tag) => (
										<div key={tag} className="flex items-center gap-2 rounded-full border px-4 py-1 capitalize">
											<span>{tag}</span>
											<FontAwesomeIcon
												icon={faXmark}
												onClick={() => handleTagChange(tag, "delete")}
											/>
										</div>
									))
								}
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	)
}