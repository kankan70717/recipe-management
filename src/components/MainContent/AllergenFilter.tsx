import { useEffect, useState } from "react";
import { useSettings } from "../../context/SettingsContext";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TypeInfo = {
	type: "allergen" | "category" | "tag";
	data: any[];
} | null;

export default function AllergenFilter() {
	const settings = useSettings();
	const [info, setInfo] = useState<TypeInfo>(null);
	const location = useLocation();
	const currentPath = location.pathname.split("/").pop() || "";

	useEffect(() => {
		setInfo({ type: "allergen", data: settings?.allergen })
	}, [settings]);

	return (
		<div className="py-5 px-20 w-full bg-gray-100 overflow-scroll">
			<div className="p-5 rounded-xl shadow-xl bg-white">
				<h2 className="text-2xl">Filter by</h2>
				<div className="flex mt-5">
					<ul className="list-none capitalize flex flex-col gap-5">
						<li>
							<input
								type="radio"
								id="allergen"
								name="filterType"
								className="hidden peer"
								onChange={() => setInfo({ type: "allergen", data: settings?.allergen })}
								defaultChecked />
							<label htmlFor="allergen" className="rounded-lg p-2 bg-white peer-checked:bg-gray-200">allergens</label>
						</li>
						<li>
							<input
								type="radio"
								id="category"
								name="filterType"
								className="hidden peer"
								onChange={() => setInfo({ type: "category", data: settings?.[currentPath]?.category })} />
							<label htmlFor="category" className="rounded-lg p-2 bg-white peer-checked:bg-gray-200">category</label>
						</li>
						<li >
							<input
								type="radio"
								id="tag"
								name="filterType"
								className="hidden peer"
								onClick={() => setInfo({ type: "tag", data: settings?.[currentPath]?.tag })} />
							<FontAwesomeIcon icon="fa-solid fa-tags" />
							<label htmlFor="tag" className="rounded-lg p-2 bg-white peer-checked:bg-gray-200">tag</label>
						</li>
					</ul>
					<ul className="list-none capitalize">
						{
							info?.type == "allergen" ? (
								info?.data?.map((data, categoryIndex) => (

									<li key={categoryIndex}>
										<h3 className="font-bold">{data.category}</h3>
										<ul>
											{data.items.map((itemName, itemIndex) => (
												<li key={itemIndex}>{itemName}</li>
											))}
										</ul>
									</li>
								))
							) : (
								info?.data?.map((item, index) => (
									<li key={index}>{item}</li>
								))
							)
						}
					</ul>
				</div>
			</div>
		</div>
	);
}