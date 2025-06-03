import { FiMenu } from "react-icons/fi";
import { useUser } from "../../context/UserContext";
import Profile from "./Profile";

type HeaderProps = {
	onToggleSidebar: () => void;
}

function onToggleSidebar() {

}

const Header = (() => {
	return (
		<header className="fixed top-0 h-16 w-full flex items-center justify-between px-5 shadow-md">
			<FiMenu className="w-6 h-auto" onClick={onToggleSidebar} />
			<Profile />
		</header>
	);
});

export default Header;
