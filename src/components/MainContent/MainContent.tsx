import { Outlet, useLocation } from "react-router-dom";
import { FilterProvider } from "../../context/FilterContext";

export default function MainContent() {
	const location = useLocation();

	return (
		<FilterProvider>
			<div className="flex-1 mt-16 flex h-[calc(100svh-4rem)] bg-gray-100">
				<div className="bg-white w-full overflow-scroll">
					<Outlet key={location.pathname} />
				</div>
			</div>
		</FilterProvider>
	);
}