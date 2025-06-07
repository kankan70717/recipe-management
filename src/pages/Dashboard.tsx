import Header from "../components/Header/Header";
import MainContent from "../components/MainContent/Maincontent";
import Sidebar from "../components/Sidebar/Sidebar";
import { SidebarContextProvider } from "../context/SidebarContext";

export default function Dashboard() {
	return (
		<>
			<SidebarContextProvider>
				<Header />
				<div className="h-svh flex">
					<Sidebar />
					<MainContent />
				</div>
			</SidebarContextProvider>
		</>);
}