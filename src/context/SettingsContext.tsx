import { createContext, useContext, useState, type ReactNode } from "react";
import type { TypeSetting } from "../types/TypeSetting";
import { initialPrepData } from "../constants/initialPrepData";

type SettingsContextType = {
	setting: TypeSetting;
	updateSetting: React.Dispatch<React.SetStateAction<TypeSetting>>;
};

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSetting = () => useContext(SettingsContext);

export const SettingProvider = ({
	children,
	downloadedSetting
}: {
	children: ReactNode,
	downloadedSetting: TypeSetting
}
) => {
	const [setting, updateSetting] = useState<TypeSetting>(downloadedSetting);
	const latestInitialPrepData = { ...initialPrepData };
	console.log("latestInitialPrepData", latestInitialPrepData);

	return (
		<SettingsContext.Provider value={{ setting, updateSetting }}>
			{children}
		</SettingsContext.Provider>
	)
};
