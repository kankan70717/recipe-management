import { useSidebarContext } from "../../context/SidebarContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {

	const { isSidebarOpen } = useSidebarContext();
	const navigate = useNavigate();
	const currentPath = location.pathname.split("/")[1] || "";

	return (
		<div id="sideBar" className={`h-[calc(100svh-4rem)] mt-16 py-5 px-3 border-r-1 border-gray-400 duration-500 ${isSidebarOpen == true ? "w-50" : "w-20"}`}>
			<ul className="flex flex-col items-center">
				<li className={`capitalize flex items-center rounded-full mb-3 px-5 py-2 text-center ${currentPath == "home" ? "bg-gray-200" : ""} hover:bg-gray-200 ${isSidebarOpen == true ? "flex-row gap-2 w-full" : "justify-center w-12 h-12 flex-col text-xs align-middle"}`}
					onClick={() => navigate("/home")}>
					<FontAwesomeIcon icon={faHouse} className={`w-8 ${isSidebarOpen ? "text-lg" : "text-xl"}`} />
					{isSidebarOpen == true ? "home" : ""}
				</li>
				<li className={`capitalize flex items-center rounded-full mb-3 px-5 py-2 text-center ${currentPath == "search" ? "bg-gray-200" : ""} hover:bg-gray-200 ${isSidebarOpen == true ? "flex-row gap-2 w-full" : "justify-center w-12 h-12 flex-col text-xs align-middle"}`}
					onClick={() => navigate("/search")}>
					<FontAwesomeIcon icon={faMagnifyingGlass} className={`w-8 ${isSidebarOpen ? "text-lg" : "text-xl"}`} />
					{isSidebarOpen == true ? "search" : ""}
				</li>
				<li className={`capitalize flex items-center rounded-full mb-3 px-5 py-2 text-center ${currentPath == "setting" ? "bg-gray-200" : ""} hover:bg-gray-200 ${isSidebarOpen == true ? "flex-row gap-2 w-full" : "justify-center w-12 h-12 flex-col text-xs align-middle"}`}
					onClick={() => navigate("/setting")}>
					<FontAwesomeIcon icon={faGear} className={`w-8 ${isSidebarOpen ? "text-lg" : "text-xl"}`} />
					{isSidebarOpen == true ? "setting" : ""}
				</li>
			</ul>
		</div>
	);
}