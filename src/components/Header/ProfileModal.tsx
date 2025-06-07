
export default function ProfileModal({ isProfileOpen }: { isProfileOpen: boolean }) {

	return (
		<div className={`absolute top-14 right-0 bg-white duration-75 w-30 shadow-lg p-2 origin-top-right ${isProfileOpen == true ? "scale-100": "scale-0"}`}>
			<ul>
				<li>Log out</li>
			</ul>
		</div>
	);
}