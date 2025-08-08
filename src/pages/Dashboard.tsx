import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { SidebarContextProvider } from "../context/SidebarContext";
import { SettingProvider } from "../context/SettingsContext";

export default function Dashboard() {
	const downloadedSetting = useLoaderData();

	return (
		<SettingProvider downloadedSetting={downloadedSetting}>
			<SidebarContextProvider>
				<Header />
				<div className="h-svh flex">
					<Sidebar />
					<Outlet />
				</div>
			</SidebarContextProvider>
		</SettingProvider>
	);
}