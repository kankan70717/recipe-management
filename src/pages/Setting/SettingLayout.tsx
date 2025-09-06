import { useState } from "react";
import { useSetting } from "../../context/SettingsContext"
import { SettingAllergen } from "./SettingAllergen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { SettingItems } from "./SettingItems";

export default function SettingLayout() {
	const settingContext = useSetting();
	if (!settingContext) {
		throw new Error("SettingContext must be used within a SettingProvider");
	}
	const { setting, updateSetting } = settingContext;
	const [formSetting, setSetting] = useState(structuredClone(setting));
	const [isAllergenOpen, setAllergenOpen] = useState(false);
	const [isDishOpen, setDishOpen] = useState(false);
	const [isPrepOpen, setPrepOpen] = useState(false);
	const [isIngredientOpen, setIngredientOpen] = useState(false);

	console.log("formSetting", formSetting);

	return (
		<div className="p-10 flex flex-col gap-5">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl capitalize">setting</h1>
				<button className="capitalize bg-black text-white rounded-full px-5 py-1">save</button>
			</div>

			{/* allergen */}
			<div className={`grid grid-cols-2 gap-5 capitalize border border-black p-5 bg-black/10 duration-500 ease-in-out overflow-hidden ${isAllergenOpen ? "max-h-screen" : "max-h-17"}`}>
				<div
					className="flex justify-between items-center col-span-2"
					onClick={() => setAllergenOpen(prev => !prev)}>
					<h2 className="text-xl">allergen</h2>
					<FontAwesomeIcon icon={faAngleDown} className={`duration-500 ease-in-out ${!isAllergenOpen && "rotate-90"}`} />
				</div>
				{
					formSetting.allergen.flatMap((allergenCategoryObj: { category: string, items: string[] }, allergenCategoryIndex: number) => (
						<SettingAllergen allergenCategoryObj={allergenCategoryObj} allergenCategoryIndex={allergenCategoryIndex} />
					))
				}
				<div className="col-span-2">
					<button
						className="capitalize flex gap-3 items-center">
						<FontAwesomeIcon icon={faPlus} />
						<span>add allergen category</span>
					</button>
				</div>
			</div>

			{/* dish */}
			<div className={`grid grid-cols-2 gap-5 capitalize border border-black p-5 bg-black/10 duration-500 ease-in-out overflow-hidden ${isDishOpen ? "max-h-screen" : "max-h-17"}`}>
				<div
					className="flex justify-between items-center col-span-2"
					onClick={() => setDishOpen(prev => !prev)}>
					<h2 className="text-xl">dish</h2>
					<FontAwesomeIcon icon={faAngleDown} className={`duration-500 ease-in-out ${!isDishOpen && "rotate-90"}`} />
				</div>
				{
					Object.entries(formSetting.dish).map(([propertyName, propertyValue]: [string, string[]]) => (
						<SettingItems propertyName={propertyName} propertyValue={propertyValue} />
					))
				}
			</div>

			{/* prep */}
			<div className={`grid grid-cols-2 gap-5 capitalize border border-black p-5 bg-black/10 duration-500 ease-in-out overflow-hidden ${isPrepOpen ? "max-h-screen" : "max-h-17"}`}>
				<div
					className="flex justify-between items-center col-span-2"
					onClick={() => setPrepOpen(prev => !prev)}>
					<h2 className="text-xl">prep</h2>
					<FontAwesomeIcon icon={faAngleDown} className={`duration-500 ease-in-out ${!isPrepOpen && "rotate-90"}`} />
				</div>
				{
					Object.entries(formSetting.prep).map(([propertyName, propertyValue]: [string, string[]]) => (
						<SettingItems propertyName={propertyName} propertyValue={propertyValue} />
					))
				}
			</div>

			{/* ingredient */}
			<div className={`grid grid-cols-2 gap-5 capitalize border border-black p-5 bg-black/10 duration-500 ease-in-out overflow-hidden ${isIngredientOpen ? "max-h-screen" : "max-h-17"}`}>
				<div
					className="flex justify-between items-center col-span-2"
					onClick={() => setIngredientOpen(prev => !prev)}>
					<h2 className="text-xl">ingredient</h2>
					<FontAwesomeIcon icon={faAngleDown} className={`duration-500 ease-in-out ${!isIngredientOpen && "rotate-90"}`} />
				</div>
				{
					Object.entries(formSetting.ingredient).map(([propertyName, propertyValue]: [string, string[]]) => (
						<SettingItems propertyName={propertyName} propertyValue={propertyValue} />
					))
				}
			</div>
		</div>
	)
}