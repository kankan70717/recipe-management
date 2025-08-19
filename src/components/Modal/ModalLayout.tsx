import type { Dispatch, SetStateAction } from "react";
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
		detailData: TypeIngredientData | null;
	}
) {

	if (!isOpen) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<div className="absolute inset-0 bg-black/50">
			<div className="absolute inset-0 rounded-lg m-20 bg-white p-10">
				<div className="flex justify-between">
					<h3 className="capitalize text-2xl">{detailData?.name}</h3>
					<FontAwesomeIcon icon={faXmark} size="xl" onClick={() => setIsOpen(false)} />
				</div>
				<form onSubmit={handleSubmit}>
					<div className="mt-5 overflow-scroll">
						content
					</div>
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