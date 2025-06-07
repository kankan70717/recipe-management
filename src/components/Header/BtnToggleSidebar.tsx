import { FiMenu } from "react-icons/fi";
import { useSidebarContext } from "../../context/SidebarContext";

export default function BtnToggleSidebar() {

	const { toggleSidebar } = useSidebarContext();

	return (
		<FiMenu className="w-6 h-auto" onClick={toggleSidebar} />
	);
}