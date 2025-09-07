import { useState } from "react";
import { useSetting } from "../../context/SettingsContext"
import { SettingAllergen } from "./SettingAllergen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { SettingItems } from "./SettingItems";
import type { TypeSetting } from "../../types/TypeSetting";
import { updateSetting } from "../../firebase/firestore";

export default function SettingLayout() {
	const settingContext = useSetting();
	if (!settingContext) {
		throw new Error("SettingContext must be used within a SettingProvider");
	}
	const { setting } = settingContext;
	const [settingFormData, setSettingFormData] = useState<TypeSetting>(structuredClone(setting));
	const [newAllergenCategory, setNewAllergenCategory] = useState("");

	const [isAllergenOpen, setAllergenOpen] = useState(false);
	const [isDishOpen, setDishOpen] = useState(false);
	const [isPrepOpen, setPrepOpen] = useState(false);
	const [isIngredientOpen, setIngredientOpen] = useState(false);

	const [isModalOpen, setModalOpen] = useState(false);
	const [isSaving, setSaving] = useState(false);

	const handleConfirm = async () => {
		try {
			await updateSetting(settingFormData);
			alert("Settings saved!");
		} catch (error) {
			console.error(error);
			alert("Failed to save settings.");
		} finally {
			setSaving(false);
			setModalOpen(false);
		}
	};
	console.log("settingFormData", settingFormData);

	return (
		<div className="p-10 flex flex-col gap-5">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl capitalize">setting</h1>
				<button
					className="capitalize bg-black text-white rounded-full px-5 py-1"
					onClick={() => {
						setModalOpen(true);
					}}>
					save
				</button>
				{isModalOpen && (
					<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
						<div className="bg-white p-6 rounded-lg shadow-lg w-80">
							<h2 className="text-lg font-semibold mb-4">Confirm Save</h2>
							<p className="mb-6">Are you sure you want to save these settings?</p>
							<div className="flex justify-end gap-4">
								<button
									className="px-4 py-2 rounded border"
									onClick={() => setModalOpen(false)}
								>
									Cancel
								</button>
								<button
									className="px-4 py-2 rounded bg-black text-white"
									onClick={handleConfirm}
									disabled={isSaving}
								>
									{isSaving ? "Saving..." : "Confirm"}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* allergen */}
			<div className={`grid grid-cols-2 gap-5 capitalize border border-black p-5 bg-black/10 duration-500 ease-in-out overflow-hidden ${isAllergenOpen ? "max-h-[2000px]" : "max-h-17"}`}>
				<div
					className="flex justify-between items-center col-span-2"
					onClick={() => setAllergenOpen(prev => !prev)}>
					<h2 className="text-xl">allergen</h2>
					<FontAwesomeIcon icon={faAngleDown} className={`duration-500 ease-in-out ${!isAllergenOpen && "rotate-90"}`} />
				</div>
				{
					settingFormData.allergen.flatMap((allergenCategoryObj: { category: string, items: string[] }, allergenCategoryIndex: number) => (
						<SettingAllergen
							allergenCategoryObj={allergenCategoryObj}
							allergenCategoryIndex={allergenCategoryIndex}
							setSettingFormData={setSettingFormData} />
					))
				}
				<div className="col-span-2 flex items-center gap-2">
					<input
						type="text"
						id="newAllergenCategory"
						name="newAllergenCategory"
						className="border border-gray-500 px-2 bg-white"
						value={newAllergenCategory}
						onChange={(e) => {
							setNewAllergenCategory(e.target.value);
						}} />
					<button
						className="capitalize flex gap-2 items-center rounded-full border bg-black text-white px-5 py-1"
						onClick={() => {
							setSettingFormData((prev) => {
								const updated = structuredClone(prev);
								const allergenCategory = { category: newAllergenCategory, items: [] }
								updated.allergen.push(allergenCategory);
								return updated;
							});
							setNewAllergenCategory("");
						}}>
						<FontAwesomeIcon icon={faPlus} />
						<span>add allergen category</span>
					</button>
				</div>
			</div>

			{/* dish */}
			<div className={`grid grid-cols-2 gap-5 capitalize border border-black p-5 bg-black/10 duration-500 ease-in-out overflow-hidden ${isDishOpen ? "max-h-[2000px]" : "max-h-17"}`}>
				<div
					className="flex justify-between items-center col-span-2"
					onClick={() => setDishOpen(prev => !prev)}>
					<h2 className="text-xl">dish</h2>
					<FontAwesomeIcon icon={faAngleDown} className={`duration-500 ease-in-out ${!isDishOpen && "rotate-90"}`} />
				</div>
				{
					Object.entries(settingFormData.dish).map(([propertyName, propertyValue]: [string, string[]]) => (
						<SettingItems
							kind="dish"
							propertyName={propertyName as "category" | "tag"}
							propertyValue={propertyValue}
							setSettingFormData={setSettingFormData} />
					))
				}
			</div>

			{/* prep */}
			<div className={`grid grid-cols-2 gap-5 capitalize border border-black p-5 bg-black/10 duration-500 ease-in-out overflow-hidden ${isPrepOpen ? "max-h-[2000px]" : "max-h-17"}`}>
				<div
					className="flex justify-between items-center col-span-2"
					onClick={() => setPrepOpen(prev => !prev)}>
					<h2 className="text-xl">prep</h2>
					<FontAwesomeIcon icon={faAngleDown} className={`duration-500 ease-in-out ${!isPrepOpen && "rotate-90"}`} />
				</div>
				{
					Object.entries(settingFormData.prep).map(([propertyName, propertyValue]: [string, string[]]) => (
						<SettingItems
							kind="prep"
							propertyName={propertyName as "category" | "tag"}
							propertyValue={propertyValue}
							setSettingFormData={setSettingFormData} />
					))
				}
			</div>

			{/* ingredient */}
			<div className={`grid grid-cols-2 gap-5 capitalize border border-black p-5 bg-black/10 duration-500 ease-in-out overflow-hidden ${isIngredientOpen ? "max-h-[2000px]" : "max-h-17"}`}>
				<div
					className="flex justify-between items-center col-span-2"
					onClick={() => setIngredientOpen(prev => !prev)}>
					<h2 className="text-xl">ingredient</h2>
					<FontAwesomeIcon icon={faAngleDown} className={`duration-500 ease-in-out ${!isIngredientOpen && "rotate-90"}`} />
				</div>
				{
					Object.entries(settingFormData.ingredient).map(([propertyName, propertyValue]: [string, string[]]) => (
						<SettingItems
							kind="ingredient"
							propertyName={propertyName as "category" | "tag"}
							propertyValue={propertyValue}
							setSettingFormData={setSettingFormData} />
					))
				}
			</div>
		</div >
	)
}