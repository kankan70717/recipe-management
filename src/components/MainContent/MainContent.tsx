import ItemDetail from "./ItemDetail";
import ItemList from "./ItemList";

export default function MainContent() {
	return (
		<div className="flex-1 mt-16 flex h-[calc(100svh-4rem)]">
			<ItemList />
			<ItemDetail />
		</div>
	);
}