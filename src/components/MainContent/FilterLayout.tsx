import { useEffect, useState } from "react";
import { useSettings } from "../../context/SettingsContext";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faLayerGroup, faSkullCrossbones, faTag } from '@fortawesome/free-solid-svg-icons'

type TypeInfo = {
	type: "allergen" | "category" | "tag";
	data: any[];
} | null;

export default function FilterLayout() {
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
					<ul className="basis-1/5 list-none capitalize flex flex-col gap-3 pr-5 border-r-1 border-r-gray-200">
						<li>
							<input
								type="radio"
								id="allergen"
								name="filterType"
								className="hidden peer"
								onChange={() => setInfo({ type: "allergen", data: settings?.allergen })}
								defaultChecked />
							<label htmlFor="allergen" className="flex items-center gap-2 w-full rounded-lg py-2 px-4 bg-white peer-checked:bg-gray-200">
								<FontAwesomeIcon className="w-4" icon={faSkullCrossbones} />
								allergens
							</label>
						</li>
						<li>
							<input
								type="radio"
								id="category"
								name="filterType"
								className="hidden peer"
								onChange={() => setInfo({ type: "category", data: settings?.[currentPath]?.category })} />
							<label htmlFor="category" className="flex items-center gap-2 w-full rounded-lg py-2 px-4 bg-white peer-checked:bg-gray-200">
								<FontAwesomeIcon className="w-4" icon={faLayerGroup} />
								category
							</label>
						</li>
						<li >
							<input
								type="radio"
								id="tag"
								name="filterType"
								className="hidden peer"
								onClick={() => setInfo({ type: "tag", data: settings?.[currentPath]?.tag })} />
							<label htmlFor="tag" className="flex items-center gap-2 w-full rounded-lg py-2 px-4 bg-white peer-checked:bg-gray-200">
								<FontAwesomeIcon className="w-4" icon={faTag} />
								tag
							</label>
						</li>
					</ul>
					<ul className="basis-2/5 list-none capitalize flex flex-col gap-3 px-5 border-r-1 border-r-gray-200">
						{
							info?.type == "allergen" ? (
								info?.data?.map((data, categoryIndex) => (
									<AllergenCategory data={data} key={categoryIndex} />
								))
							) : (
								info?.data?.map((item, index) => (
									<SelectedFilter itemName={item} key={index} />
								))
							)
						}
					</ul>
					<ul className="basis-2/5 list-none capitalize flex flex-col gap-3 px-5">
						<li>a</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

function AllergenCategory({ data }: { data: any }) {
	const [isOpen, setOpen] = useState(false);

	return (
		<li onClick={() => setOpen(prev => !prev)}>
			<div className="flex items-center justify-between">
				<h3 className="font-bold">{data.category}</h3>
				<FontAwesomeIcon icon={faAngleRight} className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
			</div>
			<ul className={`flex flex-col gap-2 transition-all duration-300 ease-in-out overflow-hidden ${isOpen == true ? "max-h-1000 py-2" : "max-h-0"}`}>
				<li key={data.category} className="flex items-center">
					<input
						type="checkbox"
						id={data.category}
						className="peer" />
					<label htmlFor={data.category} className="px-1">
						All {data.category}
					</label>
				</li>

				{data.items.map((itemName: string, itemIndex: number) => (
					<SelectedFilter itemName={itemName} key={itemIndex} />
				))}
			</ul>
		</li>
	);
}

function SelectedFilter({ itemName }: { itemName: string }) {
	return (
		<li className="flex items-center">
			<input
				type="checkbox"
				id={itemName}
				className="peer" />
			<label htmlFor={itemName} className="px-1">
				{itemName}
			</label>
		</li>
	);
}
