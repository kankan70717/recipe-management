import { Outlet } from "react-router-dom";

export default function MainContent() {
	return (
		<div className="flex-1 mt-16 flex h-[calc(100svh-4rem)]">
			<Outlet />
		</div>
	);
}