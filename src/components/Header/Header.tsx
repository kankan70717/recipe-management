import Profile from "./Profile";
import BtnToggleSidebar from "./BtnToggleSidebar";


export default function Header() {

	return (
		<header className="fixed top-0 h-16 w-full flex items-center justify-between px-7 border-b-1 border-gray-400 bg-white">
			<BtnToggleSidebar />
			<Profile />
		</header>
	);
}

