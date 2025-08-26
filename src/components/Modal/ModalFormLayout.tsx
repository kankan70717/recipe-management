import { useState, type Dispatch, type SetStateAction } from "react";
import type { TypeIngredientData } from "../../types/recipe/TypeIngredientData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { addRecipe, updateRecipe } from "../../firebase/firestore";
import type { TypeFilterKind } from "../../pages/Filter/type/TypeFilter";
import type { TypePrepData } from "../../types/recipe/TypePrepData";
import type { TypeDishData } from "../../types/recipe/TypeDishData";
import { ModalFormIngredient } from "./ModalFormKind/ModalFormIngredient";
import { ModalFormPrep } from "./ModalFormKind/ModalFormPrep";
import ModalFormResourceFilter from "./ModalFormResource/ModalFormResourceFilter";

export default function ModalFormLayout(
	{
		formState,
		setFormState,
		detailData,
		cucd,
	}: {
		formState: {
			isFormOpen: boolean;
			kind: TypeFilterKind | undefined
		};
		setFormState: Dispatch<SetStateAction<{
			isFormOpen: boolean;
			kind: TypeFilterKind | undefined
		}>>
		detailData: TypeIngredientData | TypePrepData | TypeDishData;
		cucd: "update" | "create" | "delte" | "read";
	}
) {

	if (!formState.isFormOpen) return null;

	const [formData, setFormData] = useState<TypeIngredientData | TypePrepData>({ ...detailData });
	console.log("formData", formData);
	const [showFilter, setShowFilter] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const nowSeconds = Math.floor(Date.now() / 1000);
		formData.updateDate.seconds = nowSeconds;

		if (cucd == "update") {
			updateRecipe(formData);
		} else {
			formData.createdDate.seconds = nowSeconds;
			addRecipe(formData);
		}
		console.log(formData);
	}

	return (
		<div className="absolute inset-0 bg-black/50">
			<div className={`absolute inset-0 rounded-lg m-10 pt-5 px-5 ${showFilter == true ? "bg-black/50" : "bg-white"}`}>
				<div className="flex justify-between">
					<FontAwesomeIcon icon={faXmark} size="xl" className="ml-auto" onClick={() => setFormState({
						isFormOpen: false,
						kind: undefined
					})} />
				</div>
				<form onSubmit={(e) => handleSubmit(e)} className="h-[calc(100svh-15rem)] mt-3 overflow-scroll">
					{
						formState.kind == "ingredient"
							? <ModalFormIngredient
								detailData={detailData as TypeIngredientData}
								cucd={cucd}
								formData={formData as TypeIngredientData}
								setFormData={setFormData as Dispatch<SetStateAction<TypeIngredientData>>} />
							: formState.kind == "prep"
								? <ModalFormPrep
									detailData={detailData as TypePrepData}
									cucd={cucd}
									formData={formData as TypePrepData}
									setFormData={setFormData as Dispatch<SetStateAction<TypePrepData>>}
									setShowFilter={setShowFilter} />
								: null
					}
					<div className={`flex gap-5 justify-end py-3 pr-10 rounded-lg border-gray-200 absolute bottom-0 right-0 left-0 ${showFilter ? "" : "bg-white"}`}>
						<button
							className="capitalize text-center w-30 py-1 px-3 rounded-full border border-black"
							onClick={() => setFormState({
								isFormOpen: false,
								kind: undefined
							})}>
							cancel
						</button>
						<button
							type="submit"
							className={`capitalize text-center w-30 py-1 px-3 rounded-full border border-black ${showFilter ? "bg-transparent" : "bg-black text-white"}`}>
							save
						</button>
					</div>
				</form>
				{
					showFilter
					&& <ModalFormResourceFilter
						setShowFilter={setShowFilter}
						formData={formData}
						setFormData={setFormData as Dispatch<SetStateAction<TypeDishData | TypePrepData | TypeIngredientData>>} />
				}
			</div>
		</div >
	);
}