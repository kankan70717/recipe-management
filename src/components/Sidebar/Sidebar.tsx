import { useSidebarContext } from "../../context/SidebarContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot, faKitchenSet, faUtensils } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {

	const { isSidebarOpen } = useSidebarContext();
	const navigate = useNavigate();
	const currentPath = location.pathname.split("/").pop() || "";

	return (
		<div id="sideBar" className={`h-[calc(100svh-4rem)] mt-16 py-5 px-3 border-r-1 border-gray-400 duration-75 ${isSidebarOpen == true ? "w-50" : "w-20"}`}>
			<ul className="flex flex-col items-center">
				<li className={`capitalize flex items-center rounded-full mb-3 px-5 py-2 text-center ${currentPath == "dish" ? "bg-gray-200" : ""} hover:bg-gray-200 ${isSidebarOpen == true ? "flex-row gap-2 w-full" : "justify-center w-12 h-12 flex-col text-xs align-middle"}`}
					onClick={() => navigate("/dashboard/dish")}>
					<FontAwesomeIcon icon={faUtensils} className={isSidebarOpen ? "text-lg" : "text-xl"} />
					{isSidebarOpen == true ? "dish" : ""}
				</li>
				<li className={`capitalize flex items-center rounded-full mb-3 px-5 py-2 text-center ${currentPath == "prep" ? "bg-gray-200" : ""} hover:bg-gray-200 ${isSidebarOpen == true ? "flex-row gap-2 w-full" : "justify-center w-12 h-12 flex-col text-xs align-middle"}`}
					onClick={() => navigate("/dashboard/prep")}>
					<FontAwesomeIcon icon={faKitchenSet} className={isSidebarOpen ? "text-lg" : "text-xl"} />
					{isSidebarOpen == true ? "prep" : ""}

				</li>
				<li className={`capitalize flex items-center rounded-full mb-3 px-5 py-2 text-center ${currentPath == "ingredient" ? "bg-gray-200" : ""} hover:bg-gray-200 ${isSidebarOpen == true ? "flex-row gap-2 w-full" : "justify-center w-12 h-12 flex-col text-xs align-middle"}`}
					onClick={() => navigate("/dashboard/ingredient")}>
					<FontAwesomeIcon icon={faCarrot} className={isSidebarOpen ? "text-lg" : "text-xl"} />
					{isSidebarOpen == true ? "ingredient" : ""}
				</li>
			</ul>
		</div>
	);
}