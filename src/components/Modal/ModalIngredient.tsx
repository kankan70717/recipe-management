import { useState } from "react";

export function ModalIngredient(

) {
	const [tagInput, setTagInput] = useState<string>("");
	const [isAllergenOpen, setAllergenOpen] = useState(false);
	const [isTagOpen, setTagOpen] = useState(false);
	return (
		<table className="border-separate border-spacing-y-3 border-spacing-x-5 w-full h-full mb-3">
			<tbody>
				<tr>
					<td className="w-1/2 text-center">
						<div className="flex items-center justify-center w-full aspect-square mb-5 border border-black">
							{formData.image instanceof File ? (
								<img
									src={URL.createObjectURL(formData.image)}
									className="object-cover"
								/>
							) : (
								<img
									src={formData.image}
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
											defaultValue={detailData.status}
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
											className={`capitalize w-full py-1 border rounded-md px-2 ${cucd == "update" ? "bg-gray-200 border-gray-500" : "border-black"}`}
											id="kind"
											name="kind"
											defaultValue={detailData.kind}
											disabled={cucd == "update"}
											onChange={(e) => handleSelectChange(e)}>
											<option value="dish">dish</option>
											<option value="prep">prep</option>
											<option value="ingredient">ingredient</option>
										</select>
									</td>
								</tr>
								<tr>
									<th><label htmlFor="category" className="capitalize">category</label></th>
									<td><input type="text" className="lowercase border rounded-md px-2" id="category" name="category" defaultValue={detailData.category} onChange={(e) => handleTextChange(e)} /></td>
								</tr>
								<tr>
									<th><label htmlFor="nameJa" className="capitalize">nameJa</label></th>
									<td><input type="text" className="lowercase border-black border rounded-md px-2" id="nameJa" name="nameJa" defaultValue={detailData.nameJa} onChange={(e) => handleTextChange(e)} /></td>
								</tr>
								<tr>
									<th><label htmlFor="name" className="capitalize">name</label></th>
									<td><input type="text" className="lowercase border-black border rounded-md px-2" id="name" name="name" defaultValue={detailData?.name} onChange={(e) => handleTextChange(e)} /></td>
								</tr>
								<tr>
									<th><label htmlFor="store" className="capitalize">store</label></th>
									<td><input type="text" className="lowercase border-black border rounded-md px-2" id="store" name="store" defaultValue={detailData.store} onChange={(e) => handleTextChange(e)} /></td>
								</tr>
								<tr>
									<th><label htmlFor="purchasePrice" className="capitalize">purchasePrice</label></th>
									<td><input type="number" className="lowercase border-black border rounded-md px-2" id="purchasePrice" name="purchasePrice" defaultValue={detailData.purchasePrice} onChange={(e) => handleTextChange(e)} /></td>
								</tr>
								<tr>
									<th><label htmlFor="purchaseQuantity" className="capitalize">purchaseQuantity</label></th>
									<td><input type="number" className="lowercase border-black border rounded-md px-2" id="purchaseQuantity" name="purchaseQuantity" defaultValue={detailData.purchaseQuantity} onChange={(e) => handleTextChange(e)} /></td>
								</tr>
								<tr>
									<th><label htmlFor="purchaseUnit" className="capitalize">purchaseUnit</label></th>
									<td><input type="text" className="lowercase border-black border rounded-md px-2" id="purchaseUnit" name="purchaseUnit" defaultValue={detailData.purchaseUnit} onChange={(e) => handleTextChange(e)} /></td>
								</tr>
								<tr>
									<th><label htmlFor="unitConversionRate" className="capitalize">unitConversionRate</label></th>
									<td><input type="number" className="lowercase border-black border rounded-md px-2" id="unitConversionRate" name="unitConversionRate" defaultValue={detailData.unitConversionRate} onChange={(e) => handleTextChange(e)} /></td>
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
													const ms = detailData.updateDate.seconds === 0
														? Date.now()
														: detailData.updateDate.seconds * 1000;

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
													const ms = detailData.createdDate.seconds === 0
														? Date.now()
														: detailData.createdDate.seconds * 1000;

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
											placeholder={detailData.updatePerson}
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
						<div className={`grid grid-cols-2 gap-5 mt-3 overflow-hidden transition-all duration-1000 ease-in-out ${isAllergenOpen ? "max-h-[2000px]" : "max-h-0"}`}>
							{setting.allergen.flatMap((allergenObj, allergenIndex) => {
								const elements: JSX.Element[] = [];

								Object.entries(formData.allergenForFilter).flatMap(([formAllergen, formStatus], formIndex) => {

									if (allergenObj.category === formAllergen) {
										elements.unshift(
											<div key={`cat-${allergenIndex}-${formIndex}`} className="flex items-center justify-between gap-2 capitalize">
												<div>{allergenObj.category}</div>
												{
													formStatus == "contained"
														? <FontAwesomeIcon icon={faXmark} size="lg" className="text-red-500 ml-auto" />
														: formStatus == "mayContained"
															? <FontAwesomeIcon icon={faTriangleExclamation} size="lg" className="text-yellow-500 ml-auto" />
															: formStatus == "notContained"
																? <FontAwesomeIcon icon={faCircleRegular} size="lg" className="text-blue-500 ml-auto" />
																: formStatus == "removable"
																	? <FontAwesomeIcon icon={faCircleQuestion} size="lg" className="text-green-500 ml-auto" />
																	: ""
												}
												<select
													className={`flex items-center gap-1 border border-black rounded capitalize ${formStatus == "contained" ? "bg-red-200" : formStatus == "mayContained" ? "bg-yellow-200" : formStatus == "notContained" ? "bg-blue-200" : formStatus == "removable" ? "bg-green-200" : ""}`}
													defaultValue={formStatus}
													name={allergenObj.category}
													onChange={(e) => handleAllergenChange(e)}>
													<option value="contained">contained</option>
													<option value="mayContained">mayContained</option>
													<option value="notContained">notContained</option>
													<option value="removable">removable</option>
													<option value="unknown">unknown</option>
												</select>
											</div>
										);
									}

									allergenObj.items
										.filter(item => formAllergen === item)
										.forEach((item, itemIndex) => {
											elements.push(
												<div key={`item-${allergenIndex}-${itemIndex}-${formIndex}`} className="flex items-center justify-between gap-2 capitalize">
													<div>{item}</div>
													{
														formStatus == "contained"
															? <FontAwesomeIcon icon={faXmark} size="lg" className="text-red-500 ml-auto" />
															: formStatus == "mayContained"
																? <FontAwesomeIcon icon={faTriangleExclamation} size="lg" className="text-yellow-500 ml-auto" />
																: formStatus == "notContained"
																	? <FontAwesomeIcon icon={faCircleRegular} size="lg" className="text-blue-500 ml-auto" />
																	: formStatus == "removable"
																		? <FontAwesomeIcon icon={faCircleQuestion} size="lg" className="text-green-500 ml-auto" />
																		: ""
													}
													<select
														className={`flex items-center gap-1 border border-black rounded capitalize ${formStatus == "contained" ? "bg-red-200" : formStatus == "mayContained" ? "bg-yellow-200" : formStatus == "notContained" ? "bg-blue-200" : formStatus == "removable" ? "bg-green-200" : ""}`}
														defaultValue={formStatus}
														name={item}
														onChange={(e) => handleAllergenChange(e)}>
														<option value="contained">contained</option>
														<option value="mayContained">mayContained</option>
														<option value="notContained">notContained</option>
														<option value="removable">removable</option>
														<option value="unknown">unknown</option>
													</select>
												</div>
											);
										});
								})
								return (
									<fieldset key={`allergen-wrapper-${allergenIndex}`} className="flex flex-col gap-2 mb-2 border border-gray-400 rounded px-5 py-3">
										<legend className="capitalize text-xl px-2">{allergenObj.category}</legend>
										{elements}
									</fieldset>
								);
							})}
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
										<div className="flex items-center gap-2 rounded-full border px-4 py-1 capitalize">
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