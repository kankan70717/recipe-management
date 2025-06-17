import React, { createContext, useContext, useState } from "react";
import type { TypeToggle } from "../types/TypeToggle";


const SidebarContext = createContext<TypeToggle | undefined>(undefined);

export const SidebarContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => setSidebarOpen((prev) => !prev);

	return (
		<SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
			{children}
		</SidebarContext.Provider>
	)
};

export const useSidebarContext = () => {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebarContext must be used within a SidebarContextProvider");
	}
	return context;
};
