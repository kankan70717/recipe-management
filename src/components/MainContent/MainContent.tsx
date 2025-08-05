import { Outlet, useLocation } from "react-router-dom";

export default function MainContent() {
	const location = useLocation();

	return (
		<div className="flex-1 mt-16 flex h-[calc(100svh-4rem)] bg-gray-100">
			<Outlet key={location.pathname} />
		</div>
	);
}