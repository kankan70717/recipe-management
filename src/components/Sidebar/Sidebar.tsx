import { CiSearch } from "react-icons/ci";
import { MdOutlineRestaurant } from "react-icons/md";
import { PiCookingPot } from "react-icons/pi";
import { useSidebarContext } from "../../context/SidebarContext";
import { Routes, useNavigate } from "react-router-dom";

export default function Sidebar() {

	const { isSidebarOpen } = useSidebarContext();
	const navigate = useNavigate();

	return (
		<div id="sideBar" className={`h-[calc(100svh-4rem)] mt-16 py-5 px-3 border-r-1 border-gray-400 duration-75 ${isSidebarOpen == true ? "w-50" : "w-20"}`}>
			<ul>
				<li className={`flex items-center rounded-full mb-3 px-3 py-2 text-center hover:bg-gray-200 ${isSidebarOpen == true ? "flex-row gap-2" : "flex-col text-xs align-middle"}`}
					onClick={() => navigate("/dashboard/allergen_search")}>
					<CiSearch className="w-6 h-auto" />
					Allergen Search
				</li>
				<li className={`flex items-center rounded-full mb-3 px-3 py-2 text-center hover:bg-gray-200 ${isSidebarOpen == true ? "flex-row gap-2" : "flex-col text-xs align-middle"}`}
				onClick={() => navigate("/dashboard/dish_list")}>
					<MdOutlineRestaurant className="w-6 h-auto" />
					Dish
				</li>
				<li className={`flex items-center rounded-full mb-3 px-3 py-2 text-center hover:bg-gray-200 ${isSidebarOpen == true ? "flex-row gap-2" : "flex-col text-xs align-middle"}`}>
					<PiCookingPot className="w-6 h-auto" />
					Prep
				</li>
			</ul>
		</div>
	);
}