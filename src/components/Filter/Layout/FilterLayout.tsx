import { useLocation, useNavigate } from "react-router-dom";
import type { TypeFilterPath, TypeFilterType } from "../types";
import { FilterItemLayout } from "./FilterItemLayout";
import { FilterTypeLayout } from "./FilterTypeLayout";
import { FilterSelectedLayout } from "./FilterSelectedLayout";
import { useState } from "react";

export default function FilterLayout() {
	const location = useLocation();
	const currentPath = location.pathname.split("/").pop() as TypeFilterPath;
	const [filterType, setFilterType] = useState<TypeFilterType>("allergen");
	const navigation = useNavigate();

	return (
		<div className="my-[5%] mx-[5%] rounded-xl shadow-xl bg-white w-full overflow-scroll">
			<div className="pt-6 pr-10 pl-10 h-[90%]">
				<h2 className="capitalize text-2xl mb-3">{currentPath}</h2>
				<div className="flex h-[90%]">
					<FilterTypeLayout setFilterType={setFilterType} />
					<FilterItemLayout currentPath={currentPath} filterType={filterType} />
					<FilterSelectedLayout currentPath={currentPath} />
				</div>
			</div>
			<div className="h-[10%] px-10 border-t-1 border-gray-200
			flex items-center">
				<button className="capitalize mr-auto">reset filter</button>
				<button className="uppercase py-2 px-4 rounded-full w-30 border border-black bg-white text-black">cancel</button>
				<button
					className="uppercase py-2 px-4 rounded-full w-30 ml-3 bg-black text-white"
					onClick={() => navigation("result")}>
					apply</button>
			</div>
		</div>
	);
}
