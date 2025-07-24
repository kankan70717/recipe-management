import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getSetting } from "../firebase/firestore";
import type { DocumentData } from "firebase/firestore";

export const SettingsContext = createContext<DocumentData | null | undefined>(null);

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [settings, setSettings] = useState<DocumentData | null | undefined>(null);

	const fetchSettings = async () => {
		try {
			const data = await getSetting();
			setSettings(data);
		} catch (error) {
			console.error("Error fetching settings:", error);
		}
	};

	useEffect(() => {
		fetchSettings();
	}, []);

	return (
		<SettingsContext.Provider value={settings}>
			{children}
		</SettingsContext.Provider>
	)
};
