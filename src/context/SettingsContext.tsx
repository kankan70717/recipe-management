import { createContext, useContext, useState, type ReactNode } from "react";
import type { DocumentData } from "firebase/firestore";

export const SettingsContext = createContext<DocumentData>({});

export const useSetting = () => useContext(SettingsContext);

export const SettingProvider = ({
	children,
	downloadedSetting
}: {
	children: ReactNode,
	downloadedSetting: DocumentData
}
) => {
	const [setting, updateSetting] = useState<DocumentData | null | undefined>(downloadedSetting);

	return (
		<SettingsContext.Provider value={{ setting, updateSetting }}>
			{children}
		</SettingsContext.Provider>
	)
};
