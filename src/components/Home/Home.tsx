import ModalLayout from "../Modal/ModalLayout";
import { initialIngredientData } from "../../constants/initialIngredientData";
import { useState } from "react";

export default function Home() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="relative h-full">
			<div className="p-5">
				<button
					className="capitalize border bg-gray-200 rounded px-2 py-1"
					onClick={() => setIsOpen(true)}>
					add new recipe
				</button>
			</div>
			<ModalLayout
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				detailData={initialIngredientData}
				cucd={"create"}
				kind="ingredient" />
		</div>
	)
}