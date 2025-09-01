import { useSetting } from "../../context/SettingsContext"

export default function SettingLayout() {
	const settingContext = useSetting();
	if (!settingContext) {
		throw new Error("SettingContext must be used within a SettingProvider");
	}
/* 	const { setting, updateSetting } = settingContext;
	const [formSetting, setSetting] = useState(structuredClone(setting));
 */
	return (
		<div className="p-5">
			{/* <fieldset className="capitalize border border-black rounded p-5">
				<legend className="px-3 text-xl">allergen</legend>

				{
					formSetting.allergen.flatMap((allergenCategoryObj, allergenCategoryIndex) => (
						<SettingAllergen allergenCategoryObj={allergenCategoryObj} allergenCategoryIndex={allergenCategoryIndex} handleAllergen={handleAllergen} />
					))
				}

			</fieldset> */}

		</div>
	)
}