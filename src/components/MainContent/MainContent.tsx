import { Outlet, useLocation } from "react-router-dom";
import { FilterProvider } from "../../context/FilterContext";
import { createFilterItem } from "../Filter/utils/createFilterItem";
import { useSetting } from "../../context/SettingsContext";

export default function MainContent() {
	const location = useLocation();
	const { setting } = useSetting();
	const initFilterItem = createFilterItem(setting);

	return (
		<FilterProvider initFilterItem={initFilterItem}>

			<div className="flex-1 mt-16 flex h-[calc(100svh-4rem)] bg-gray-100">
				<Outlet key={location.pathname} />
			</div>
		</FilterProvider>
	);
}