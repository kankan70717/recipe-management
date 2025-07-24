import { useEffect, useState } from "react";
import { useSettings } from "../../context/SettingsContext";

export default function AllergenFilter() {
	const settings = useSettings();
	const [info, setInfo] = useState(null);

	useEffect(() => {
		setInfo(settings?.allergen)
	}, [settings]);

	return (
		<div className="py-5 px-20 w-full bg-gray-100 overflow-scroll">
			<div className="p-5 rounded-xl shadow-xl bg-white flex gap-5">
				<div className="">
					<h2 className="text">Filter by</h2>
					<ul className="list-none capitalize">
						<li onClick={() => setInfo(settings?.allergen)}>
							allergens
						</li>
						<li onClick={() => setInfo(settings?.dish.category)}>
							category
						</li>
						<li onClick={() => setInfo(settings?.dish.tag)}>
							tag
						</li>
					</ul>
				</div>
				<div>
					<ul className="list-none">
						{
							info?.map((item, index) => {
								if (typeof item === 'object') {
									return (<li key={index}>{item.category}</li>);
								} else {
									return (<li key={index}>{JSON.stringify(item)}</li>);
								}
							})
						}
					</ul>
				</div>
			</div>
		</div>
	);
}