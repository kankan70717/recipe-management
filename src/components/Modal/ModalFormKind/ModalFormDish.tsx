import { useState, type Dispatch, type SetStateAction } from "react";
import type { TypeFilterKind } from "../../../pages/Filter/type/TypeFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faTags, faXmark } from "@fortawesome/free-solid-svg-icons";
import type { TypeDishData } from "../../../types/recipe/TypeDishData";

export function ModalFormDish({
	cucd,
	formData,
	setFormData,
	setShowFilter
}: {
	cucd: "update" | "create" | "delte" | "read";
	formData: TypeDishData;
	setFormData: Dispatch<SetStateAction<TypeDishData>>;
	setShowFilter: Dispatch<SetStateAction<boolean>>;
}

) {
	const [tagInput, setTagInput] = useState<string>("");
	const [isTagOpen, setTagOpen] = useState(false);
	const [isResourceOpen, setResourceOpen] = useState(false);

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = e.target;
		const file = e.target.files?.[0] || null;
		setFormData((prev) => ({
			...prev,
			[name]: file,
		}));
	}

	const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		console.log(value);

		setFormData((prev) => ({
			...prev,
			[name]: value as TypeFilterKind,
		}));
	}

	const handleTagChange = (tag: string, way: "add" | "delete") => {
		if (way == "delete") {
			setFormData((prev) => ({
				...prev,
				tag: [...prev.tag.filter(item => item !== tag)]
			}));
		} else if (way == "add") {
			setFormData((prev) => ({
				...prev,
				tag: prev.tag.includes(tag) ? prev.tag : [...prev.tag, tag]
			}));
		}
	}

	const handleResourceUsageAmount = (
		docID: string,
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...structuredClone(prev),
			resources: {
				...prev.resources,
				[docID]: {
					...prev.resources[docID],
					[name]: value,
				},
			},
		}));
	};

	return (
		<>
			<table className="border-separate border-spacing-y-3 border-spacing-x-5 w-full h-full pb-20">
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
										<td><input type="text" className="lowercase border rounded-md px-2" id="category" name="category" defaultValue={formData.category} onChange={(e) => handleTextChange(e)} /></td>
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
										<th><label htmlFor="sellPrice" className="capitalize">sellPrice</label></th>
										<td><input type="number" className="lowercase border-black border rounded-md px-2" id="sellPrice" name="sellPrice" defaultValue={formData.sellPrice} onChange={(e) => handleTextChange(e)} /></td>
									</tr>
									<tr>
										<th><label htmlFor="totalCost" className="capitalize">totalCost</label></th>
										<td><input type="number" className="lowercase border-black border rounded-md px-2" id="totalCost" name="totalCost" defaultValue={formData.totalCost} onChange={(e) => handleTextChange(e)} /></td>
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
							<div className="flex flex-col gap-2 w-full">
								<div className="capitalize font-bold">instruction</div>
								<textarea
									name="instruction"
									id="instruction"
									className="lowercase border-black border rounded-md px-2 mb-3"
									defaultValue={formData.instruction}
									onChange={(e) => handleTextChange(e)}></textarea>
							</div>
						</td>
					</tr>
					<tr>
						<td colSpan={2}>
							<div className="flex flex-col gap-2 w-full">
								<div className="capitalize font-bold">description</div>
								<textarea
									name="description"
									id="description"
									className="lowercase border-black border rounded-md px-2 mb-3"
									defaultValue={formData.description}
									onChange={(e) => handleTextChange(e)}></textarea>
							</div>
						</td>
					</tr>
					<tr>
						<td colSpan={2}>
							<div className="capitalize font-bold pb-2 flex items-center justify-between border-b-1 border-gray-300"
								onClick={() => setResourceOpen(prev => !prev)}>
								<span>resources</span>
								<FontAwesomeIcon icon={faAngleRight} className={`transition-all duration-1000 ease-in-out ${isResourceOpen && "rotate-90"}`} />
							</div>
							<div className={`flex flex-col transition-all duration-1000 ease-in-out overflow-hidden ${isResourceOpen ? "max-h-100" : "max-h-0"}`}>
								{
									Object.entries(formData.resources).map(([docID, resourceObj]) => (
										<div key={docID} className="flex justify-between items-center mx-10 py-2 border-gray-300 border-b-1">
											<div className="capitalize">{resourceObj.name}</div>
											<div className="flex gap-x-1 items-center">
												<input
													type="number"
													id={docID}
													name="usageAmount"
													className="border border-black rounded py-1 text-right"
													defaultValue={resourceObj.usageAmount}
													onChange={(e) => handleResourceUsageAmount(docID, e)} />
												<span>{resourceObj.usageUnit}</span>
											</div>
										</div>
									))
								}
								<div className="text-center mt-5">
									<button
										type="button"
										className="capitalize border border-black rounded-full py-1 px-3 w-1/2"
										onClick={() => setShowFilter(prev => !prev)}>
										add item
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td colSpan={2}>
							<div className="capitalize font-bold pb-2 flex items-center justify-between border-b-1 border-gray-300"
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
		</>
	)
}