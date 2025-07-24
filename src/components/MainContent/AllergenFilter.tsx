import { useSettings } from "../../context/SettingsContext";

export default function AllergenFilter() {
	const settings = useSettings();

	return (
		<div className="py-5 px-20 w-full bg-gray-100 overflow-scroll">
			<div className="p-5 rounded-xl shadow-xl bg-white flex gap-5">
				<div className="">
					<h2 className="text">Filter by</h2>
					<ul className="list-none">
						<li className="capitalize">
							allergens
						</li>
					</ul>
				</div>
				<div>
					<ul className="list-none">
						<li>
							nuts
						</li>
						<li>
							almond
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}