import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { SidebarContextProvider } from "../context/SidebarContext";

export default function Dashboard() {
	return (
		<>
			<SidebarContextProvider>
				<Header />
				<div className="h-svh flex">
					<Sidebar />
					<Outlet />
				</div>
			</SidebarContextProvider>
		</>);
}