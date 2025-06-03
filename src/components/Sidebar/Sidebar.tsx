import { CiSearch } from "react-icons/ci";
import { MdOutlineRestaurant } from "react-icons/md";
import { PiCookingPot } from "react-icons/pi";

export default function Sidebar() {
	return (
		<div id="sideBar" className="mt-16 py-5 px-3 fixed h-full shadow-2xl">
			<ul>
				<li className="flex gap-3 items-center rounded-full py-1 px-3 mb-3">
					<CiSearch className="w-6 h-auto"/>
					Allergen Search
				</li>
				<li className="flex gap-3 items-center rounded-full py-1 px-3 mb-3">
					<MdOutlineRestaurant className="w-6 h-auto" />
					Dish
				</li>
				<li className="flex gap-3 items-center rounded-full py-1 px-3">
					<PiCookingPot className="w-6 h-auto" />
					Prep
				</li>
			</ul>
		</div>
	);
}