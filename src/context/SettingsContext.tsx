import { createContext, useContext, useState, type ReactNode } from "react";
import type { TypeSetting } from "../types/TypeSetting";
import type { TypeUserData } from "../types/users/TypeUsers";

type SettingsContextType = {
	setting: TypeSetting;
	updateSetting: React.Dispatch<React.SetStateAction<TypeSetting>>;
	users: Record<string, TypeUserData>;
	setUsers: React.Dispatch<React.SetStateAction<Record<string, TypeUserData>>>;
};

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSetting = () => {
	const context = useContext(SettingsContext);
	if (!context) throw new Error("useSetting must be used within a SettingProvider");
	return context;
};

export const SettingProvider = ({
	children,
	downloadedData
}: {
	children: ReactNode,
	downloadedData: { setting: TypeSetting, users: Record<string, TypeUserData> }
}
) => {
	console.log("downloadedData", downloadedData);
	const [setting, updateSetting] = useState<TypeSetting>(downloadedData.setting);
	const [users, setUsers] = useState<Record<string, TypeUserData>>(downloadedData.users);

	return (
		<SettingsContext.Provider value={{ setting, updateSetting, users, setUsers }}>
			{children}
		</SettingsContext.Provider>
	)
};
