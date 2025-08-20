import { useState, type Dispatch, type JSX, type SetStateAction } from "react";
import type { TypeIngredientData } from "../../types/TypeIngredientData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSetting } from "../../context/SettingsContext";
import { AllergenCategory } from "../Filter/AllergenCategory";

export default function ModalLayout(
	{
		isOpen,
		setIsOpen,
		detailData

	}: {
		isOpen: boolean;
		setIsOpen: Dispatch<SetStateAction<boolean>>;
		detailData: TypeIngredientData;
	}
) {

	if (!isOpen) return null;

	const settingContext = useSetting();
	if (!settingContext) {
		throw new Error("SettingContext must be used within a SettingProvider");
	}
	const { setting } = settingContext;

	const [formData, setFormData] = useState<TypeIngredientData>({ ...detailData });


	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, files } = e.target;
		const selectedFile = files?.[0] || null;

		setFormData((prev) => ({
			...prev,
			[name]: selectedFile ?? value,
		}));
	}

	const handleSubmit = () => {

	}

	return (
		<div className="absolute inset-0 bg-black/50">
			<div className="absolute inset-0 rounded-lg m-20 bg-white p-10">
				<div className="flex justify-between">
					<FontAwesomeIcon icon={faXmark} size="xl" className="ml-auto" onClick={() => setIsOpen(false)} />
				</div>
				<form onSubmit={handleSubmit} className="h-[calc(100svh-22rem)] mt-3 overflow-scroll">
					<table className="w-full h-full">
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
										<input type="file" accept="image/*" className="hidden" name="image" onChange={(e) => handleChange(e)} />
									</label>
								</td>
								<td className="w-1/2">
									<table className="border-separate border-spacing-3 overflow-scroll">
										<tbody>
											<tr>
												<th className="capitalize">status</th>
												<td>
													<label htmlFor="active" className="border border-black rounded-full py-1 px-3 mr-2 has-[:checked]:bg-black has-[:checked]:text-white">
														<span className="capitalize">active</span>
														<input type="radio" id="active" className="hidden" name="status" value="active" checked={formData.status == "active"} onChange={(e) => handleChange(e)} />
													</label>
													<label htmlFor="inactive" className="border border-black rounded-full py-1 px-3 has-[:checked]:bg-black has-[:checked]:text-white">
														<span className="capitalize">inactive</span>
														<input type="radio" id="inactive" className="hidden" name="status" value="inactive" checked={formData.status == "inactive"} onChange={(e) => handleChange(e)} />
													</label>
												</td>
											</tr>
											<tr>
												<th><label htmlFor="kind" className="capitalize">kind</label></th>
												<td><input type="text" className="lowercase border-gray-500 border rounded-md px-2 bg-gray-200" id="kind" defaultValue={detailData.kind} disabled /></td>
											</tr>
											<tr>
												<th><label htmlFor="nameJa" className="capitalize">nameJa</label></th>
												<td><input type="text" className="lowercase border-black border rounded-md px-2" id="nameJa" defaultValue={detailData.nameJa} /></td>
											</tr>
											<tr>
												<th><label htmlFor="name" className="capitalize">name</label></th>
												<td><input type="text" className="lowercase border-black border rounded-md px-2" id="name" defaultValue={detailData?.name} /></td>
											</tr>
											<tr>
												<th><label htmlFor="store" className="capitalize">store</label></th>
												<td><input type="text" className="lowercase border-black border rounded-md px-2" id="store" defaultValue={detailData.store} /></td>
											</tr>
											<tr>
												<th><label htmlFor="purchasePrice" className="capitalize">purchasePrice</label></th>
												<td><input type="number" className="lowercase border-black border rounded-md px-2" id="purchasePrice" defaultValue={detailData.purchasePrice} /></td>
											</tr>
											<tr>
												<th><label htmlFor="purchaseQuantity" className="capitalize">purchaseQuantity</label></th>
												<td><input type="number" className="lowercase border-black border rounded-md px-2" id="purchaseQuantity" defaultValue={detailData.purchaseQuantity} /></td>
											</tr>
											<tr>
												<th><label htmlFor="purchaseUnit" className="capitalize">purchaseUnit</label></th>
												<td><input type="text" className="lowercase border-black border rounded-md px-2" id="purchaseUnit" defaultValue={detailData.purchaseUnit} /></td>
											</tr>
											<tr>
												<th><label htmlFor="unitConversionRate" className="capitalize">unitConversionRate</label></th>
												<td><input type="number" className="lowercase border-black border rounded-md px-2" id="unitConversionRate" defaultValue={detailData.unitConversionRate} /></td>
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
																const date = new Date(detailData.updateDate.seconds * 1000);
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
																const date = new Date(detailData.createdDate.seconds * 1000);
																const pad = (n: number) => n.toString().padStart(2, '0');
																return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
															})()
														} />
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr>
								<td colSpan={2}>
									<div className="capitalize font-bold">allergen</div>
									<div className="flex gap-2 flex-wrap">
										{setting.allergen.flatMap((allergenObj, allergenIndex) => {
											const elements: JSX.Element[] = [];

											Object.entries(detailData.allergenForFilter).flatMap(([detailAllergen, detailStatus], detailIndex) => {

												if (allergenObj.category === detailAllergen) {
													elements.unshift(
														<div key={`cat-${allergenIndex}-${detailIndex}`}>
															{allergenObj.category}
														</div>
													);
												}

												allergenObj.items
													.filter(item => detailAllergen === item)
													.forEach((item, itemIndex) => {
														elements.push(
															<div key={`item-${allergenIndex}-${itemIndex}-${detailIndex}`}>
																{item}
															</div>
														);
													});
											})
											return (
												<div key={`allergen-wrapper-${allergenIndex}`} className="mb-2">
													{elements}
												</div>
											);
										})}
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<div className="flex gap-5 justify-end py-3 pr-10 rounded-lg border-t-1 border-gray-200 absolute bottom-0 right-0 left-0 bg-white">
						<button
							className="capitalize text-center w-30 py-1 px-3 rounded-full border border-black"
							onClick={() => setIsOpen(false)}>
							cancel
						</button>
						<button
							type="submit"
							className="capitalize text-center w-30 py-1 px-3 rounded-full border border-black bg-black text-white">
							save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}