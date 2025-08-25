import { initialIngredientData } from "../../constants/initialIngredientData";
import { useState } from "react";
import type { TypeFilterKind } from "../Filter/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireBurner, faSeedling, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { initialPrepData } from "../../constants/initialPrepData";
import { initialDishData } from "../../constants/initialDishData";
import ModalFormLayout from "../Modal/ModalFormLayout";

export default function Home() {
	const [formState, setFormState] = useState<{
		isFormOpen: boolean;
		kind: TypeFilterKind | undefined
	}>({
		isFormOpen: false,
		kind: undefined
	});

	return (
		<div className="relative h-full">
			<div className="grid grid-cols-3 gap-3 p-5">
				<button
					className="flex flex-col justify-center gap-5 capitalize border border-black bg-white rounded p-10"
					onClick={() => {
						setFormState({
							isFormOpen: true,
							kind: "dish"
						});
					}}>
					<FontAwesomeIcon icon={faUtensils} size="2xl" />
					<span>add new dish</span>
				</button>
				<button
					className="flex flex-col justify-center gap-5 capitalize border border-black bg-white rounded p-10"
					onClick={() => {
						setFormState({
							isFormOpen: true,
							kind: "prep"
						});
					}}>
					<FontAwesomeIcon icon={faFireBurner} size="2xl" />
					<span>add new prep</span>
				</button>
				<button
					className="flex flex-col justify-center gap-5 capitalize border border-black bg-white rounded p-10"
					onClick={() => {
						setFormState({
							isFormOpen: true,
							kind: "ingredient"
						});
					}}>
					<FontAwesomeIcon icon={faSeedling} size="2xl" />
					<span>add new ingredient</span>
				</button>
			</div>
			<ModalFormLayout
				formState={formState}
				setFormState={setFormState}
				detailData={
					formState.kind == "ingredient"
						? initialIngredientData
						: formState.kind == "prep"
							? initialPrepData : formState.kind == "dish"
								? initialDishData
								: initialDishData
				}
				cucd={"create"} />
		</div >
	)
}