// usePrepFormHandlers.ts
import type { TypeFilterKind } from "../../../pages/Filter/type/TypeFilter";
import type { Dispatch, SetStateAction } from "react";
import type { TypeIngredientData } from "../../../types/recipe/TypeIngredientData";
import type { TypePrepData } from "../../../types/recipe/TypePrepData";
import type { TypeDishData } from "../../../types/recipe/TypeDishData";
import type { TypeAllergenStatus } from "../../../types/TypeAllergenStatus";
import type { TypeResource } from "../../../types/recipe/TypeResource";
import { initialResourcesData } from "../../../constants/initialResourcesData";

export function useFormHandlers<T extends TypeIngredientData | TypePrepData | TypeDishData>(
	setFormData: Dispatch<SetStateAction<T>>
) {

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;

		setFormData(prev => {
			const updated: any = structuredClone(prev);

			if (["purchasePrice", "purchaseQuantity", "yieldRate", "unitConversionRate"].includes(name)) {
				updated[name] = parseFloat(value);
			} else {
				updated[name] = value.toLowerCase();
			}

			const purchasePrice = parseFloat(updated.purchasePrice);
			const purchaseQuantity = parseFloat(updated.purchaseQuantity);
			const yieldRate = parseFloat(updated.yieldRate);
			const unitConversionRate = parseFloat(updated.unitConversionRate);

			if (!isNaN(purchasePrice) && !isNaN(purchaseQuantity) && !isNaN(yieldRate) && !isNaN(unitConversionRate) && purchaseQuantity > 0 && unitConversionRate > 0) {
				updated.costPerUsageUnit = parseFloat(
					(purchasePrice / (purchaseQuantity * (yieldRate / 100) / unitConversionRate)).toFixed(10)
				);
			}

			return updated;
		});
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = e.target;
		const file = e.target.files?.[0] || null;
		setFormData(prev => ({ ...prev, [name]: file }));
	};

	const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value as TypeFilterKind }));
	};

	const handleTagChange = (tag: string, way: "add" | "delete") => {
		setFormData(prev => {
			return {
				...prev,
				tag: way === "delete"
					? (prev as any).tag.filter((item: string) => item !== tag)
					: (prev as any).tag.includes(tag) ? (prev as any).tag : [...(prev as any).tag, tag]
			};
		});
	};

	const handleResourceUsageAmount = (
		docID: string,
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		const newValue = Number(value);

		setFormData(prev => {
			if ("resources" in prev && "finishedAmount" in prev) {
				const updatedResources = {
					...prev.resources,
					[docID]: {
						...prev.resources[docID],
						[name]: newValue,
						totalCost: parseFloat(
							((prev.resources[docID].costPerUsageUnit ?? 0) * newValue).toFixed(10)
						),
					},
				};

				const calculatedTotalCost = Object.values(updatedResources).reduce(
					(sum, r) => sum + (r.totalCost ?? 0),
					0
				);

				return {
					...prev,
					resources: updatedResources,
					totalCost: parseFloat(calculatedTotalCost.toFixed(10)),
					costPerUsageUnit: parseFloat((calculatedTotalCost / prev.finishedAmount).toFixed(10)),
				};

			} else if ("totalCost" in prev && "sellPrice" in prev) {
				const updatedResources = {
					...prev.resources,
					[docID]: {
						...prev.resources[docID],
						[name]: newValue,
						totalCost: parseFloat(
							((prev.resources[docID].costPerUsageUnit ?? 0) * newValue).toFixed(10)
						),
					},
				};

				const calculatedCost = Object.values(updatedResources).reduce(
					(sum, r) => sum + (r.totalCost ?? 0),
					0
				);

				return {
					...prev,
					resources: updatedResources,
					totalCost: parseFloat(calculatedCost.toFixed(10)),
				};
				
			} else {
				return prev;
			}
		});
	};

	const handleResource = (e: React.ChangeEvent<HTMLInputElement>, item: TypeIngredientData | TypePrepData) => {
		const resource: TypeResource = { ...initialResourcesData };

		if (e.target.checked) {
			resource.kind = item.kind;
			resource.name = item.name;
			resource.usageAmount = 0;
			resource.usageUnit = item.usageUnit;
			resource.costPerUsageUnit = item.costPerUsageUnit;
			resource.totalCost = 0;
			resource.removable = false;

			resource.resourceAllergens = structuredClone(item.allergen);
			resource.totalCost = item.costPerUsageUnit * resource.usageAmount;

			setFormData((prev) => {
				if (!("resources" in prev)) return prev;
				return {
					...structuredClone(prev),
					resources: {
						...structuredClone(prev.resources),
						[item.docID]: structuredClone(resource)
					}
				};
			});


		} else {
			setFormData((prev) => {
				if (!("resources" in prev)) return prev;
				const updatedResources = { ...prev.resources };
				delete updatedResources[item.docID];

				return {
					...structuredClone(prev),
					resources: updatedResources
				};
			});
		}
	}

	const removeResource = (docID: string) => {
		setFormData(prev => {
			if (!("resources" in prev)) return prev;
			const updated = structuredClone(prev.resources);
			delete updated[docID];
			return { ...structuredClone(prev), resources: updated };
		});
	};

	const handleAllergenCategoryChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		allergenCategoryName: string
	) => {
		const { value } = e.target;

		setFormData((prev) => ({
			...prev,
			allergen: {
				...prev.allergen,
				[allergenCategoryName]: {
					...prev.allergen[allergenCategoryName],
					status: value as TypeAllergenStatus,
				}
			}
		}));
	};

	const handleAllergenItemChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		allergenCategoryName: string
	) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			allergen: {
				...prev.allergen,
				[allergenCategoryName]: {
					...prev.allergen[allergenCategoryName],
					items: {
						...prev.allergen[allergenCategoryName].items,
						[name]: { status: value as TypeAllergenStatus }
					},
				}
			}
		}));
	};

	return {
		handleTextChange,
		handleImageChange,
		handleSelectChange,
		handleTagChange,
		handleResourceUsageAmount,
		handleResource,
		removeResource,
		handleAllergenCategoryChange,
		handleAllergenItemChange
	};
}
