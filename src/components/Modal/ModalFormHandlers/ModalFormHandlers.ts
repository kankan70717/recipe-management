import type { Dispatch, SetStateAction } from "react";
import type { TypeIngredientData } from "../../../types/recipe/TypeIngredientData";
import type { TypePrepData } from "../../../types/recipe/TypePrepData";
import type { TypeDishData } from "../../../types/recipe/TypeDishData";
import type { TypeAllergenStatus } from "../../../types/TypeAllergenStatus";
import type { TypeResource } from "../../../types/recipe/TypeResource";
import { initialResourcesData } from "../../../constants/initialResourcesData";

export function useFormHandlers(
	setFormData: Dispatch<SetStateAction<TypeIngredientData | TypePrepData | TypeDishData>>
) {
	const calculateCostPerUsageUnit = (formData: TypeIngredientData | TypePrepData | TypeDishData) => {
		switch (formData.kind) {
			case "prep": {
				const costPerUsageUnit = parseFloat((formData.totalCost / formData.finishedAmount).toFixed(10));
				return costPerUsageUnit;
			}

			case "ingredient": {
				const costPerUsageUnit = parseFloat((formData.purchasePrice / (formData.purchaseQuantity * (formData.yieldRate / 100) / formData.unitConversionRate)).toFixed(10));
				return costPerUsageUnit;
			}
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;

		setFormData(prev => {
			const updated: any = structuredClone(prev);
			const fieldType =
				e.target instanceof HTMLSelectElement
					? "select"
					: type;

			switch (fieldType) {
				case "number": {
					updated[name] = parseFloat(value);
					break;
				}
				case "select":
				case "text": {
					updated[name] = value.toLowerCase();
					break;
				}

				case "file": {
					const target = e.target as HTMLInputElement;
					updated[name] = target.files?.[0] || null;
					break;
				}
			}

			if (prev.kind == "prep" || prev.kind == "ingredient") {
				updated.costPerUsageUnit = calculateCostPerUsageUnit(updated);
			}

			return updated;
		});
	};

	const handleTagChange = (tag: string, way: "add" | "delete") => {

		setFormData(prev => {
			const updated: any = structuredClone(prev);

			if (way === "delete") {
				const updatedTag = updated.tag.filter((item: string) => item !== tag);
				updated.tag = updatedTag;
			} else {
				const updatedTag = updated.tag.includes(tag) ? updated.tag : [...updated.tag, tag];
				updated.tag = updatedTag;
			}
			return updated;
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
		handleChange,
		handleTagChange,
		handleResourceUsageAmount,
		handleResource,
		removeResource,
		handleAllergenCategoryChange,
		handleAllergenItemChange
	};
}
