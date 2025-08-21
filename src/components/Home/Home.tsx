import ModalLayout from "../Modal/ModalLayout";
import { initialIngredientData } from "../../constants/initialIngredientData";

export default function Home() {
	return (
		<div>
			<ModalLayout isOpen={true} setIsOpen={null} detailData={initialIngredientData} />
		</div>
	)
}