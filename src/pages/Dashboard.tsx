import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { SidebarContextProvider } from "../context/SidebarContext";
import { SettingProvider } from "../context/SettingsContext";

export default function Dashboard() {
	const downloadedData = useLoaderData();

	return (
		<SettingProvider downloadedData={downloadedData}>
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