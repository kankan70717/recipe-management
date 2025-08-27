import { useNavigate } from "react-router-dom";
import { logout } from "../../firebase/logout";

export default function ProfileModal({ isProfileOpen }: { isProfileOpen: boolean }) {
	const navigate = useNavigate();
	
	const handleLogout = async () => {
		try {
			await logout();
			navigate("/");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};
	return (
		<div className={`absolute top-12 right-0 rounded border border-gray-300 bg-white duration-75 w-30 shadow-lg p-2 origin-top-right ${isProfileOpen == true ? "scale-100" : "scale-0"}`}>
			<ul className="text-center">
				<li onClick={handleLogout}>Log out</li>
			</ul>
		</div>
	);
}