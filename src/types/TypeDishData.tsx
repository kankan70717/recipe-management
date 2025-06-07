type TypeDishData = {
	id: string;
	status_store_kind: SubType_status_store_kind;
	name: string;
	category: SubType_dishCategory;
	description: string;
	store: string;
	tags: string[];
	resources: {
		[itemID: string]: {
			type: string;
			usageAmount: number;
			removable: boolean;
			substitute: string[];
			substituteDescription: string;
		};
	};
	updatePerson: string;
	updateDate: number;
};

type SubType_status_store_kind = "active_raisu_ingredient" | "inactive_raisu_prep";
type SubType_dishCategory = "bento" | "appetizer";