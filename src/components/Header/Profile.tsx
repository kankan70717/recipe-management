import { MdKeyboardArrowDown } from "react-icons/md";
import profileImg from "../../assets/kanta.jpeg"

export default function Profile() {
	return (
		<div className="flex items-center gap-2 rounded-full border border-gray-400 py-1 px-3">
			<div className="w-10 h-10">
				<img src={profileImg} alt="" className="rounded-full w-full h-auto" />
			</div>
			<p>sample.email@sample.com</p>
			<MdKeyboardArrowDown className="w-6 h-auto" />
		</div>
	);
}