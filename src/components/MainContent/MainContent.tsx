import { Outlet, useLocation } from "react-router-dom";

export default function MainContent() {
	const location = useLocation();

	return (
		<div className="flex-1 mt-16 flex h-[calc(100svh-4rem)]">
			<Outlet key={location.pathname} />
		</div>
	);
}