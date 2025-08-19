import { useState, type Dispatch, type SetStateAction } from "react";
import type { TypeIngredientData } from "../../types/TypeIngredientData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

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

	const [formData, setFormData] = useState<TypeIngredientData>({ ...detailData });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { name, value } = e.target;
		const selectedFile = e.target.files?.[0] || null;

		if (selectedFile) {
			setFormData((prev) => ({
				...prev,
				[name]: selectedFile,
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	}

	const handleSubmit = () => {

	}

	return (
		<div className="absolute inset-0 bg-black/50">
			<div className="absolute inset-0 rounded-lg m-20 bg-white p-10">
				<div className="flex justify-between">
					<FontAwesomeIcon icon={faXmark} size="xl" className="ml-auto" onClick={() => setIsOpen(false)} />
				</div>
				<form onSubmit={handleSubmit} className="h-[calc(100svh-22rem)]">
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
									<table className="border-separate border-spacing-3 py-3 overflow-scroll">
										<tbody>
											<tr>
												<th className="capitalize">status</th>
												<td>
													<label className="capitalize border border-black rounded-full py-1 px-3 mr-2 has-checked:bg-black has-checked:text-white">
														active
														<input type="radio" className="hidden" name="status" value="active" checked={detailData?.status == "active"} onChange={(e) => handleChange(e)} />
													</label>
													<label className="capitalize border border-black rounded-full py-1 px-3 has-checked:bg-black has-checked:text-white">
														inactive
														<input type="radio" className="hidden" name="status" value="inactive" checked={detailData?.status == "inactive"} onChange={(e) => handleChange(e)} />
													</label>
												</td>
											</tr>
											<tr>
												<th><label htmlFor="name" className="capitalize">name</label></th>
												<td><input type="text" className="lowercase border-black border rounded-md px-2" id="name" defaultValue={detailData?.name} /></td>
											</tr>
											<tr>
												<th><label htmlFor="store" className="capitalize">store</label></th>
												<td><input type="text" className="lowercase border-black border rounded-md px-2" id="store" defaultValue={detailData?.store} /></td>
											</tr>
										</tbody>
									</table>
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