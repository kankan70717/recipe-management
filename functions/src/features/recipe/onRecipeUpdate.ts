import { onDocumentUpdated } from "firebase-functions/firestore";
import { TypeIngredientData } from "./types/TypeIngredientData";
import { TypeDishData } from "./types/TypeDishData";
import { TypePrepData } from "./types/TypePrepData";
import { handleRelatedRecipe } from "./utils/handleRelatedRecipe";
import { db } from "../../config";

export const onRecipeUpdated = onDocumentUpdated(
	"tamaru/{docID}",
	async (event) => {
		const updatedDocID = event.params.docID;

		const beforeSnap = event.data?.before;
		const afterSnap = event.data?.after;
		const colRef = db.collection("tamaru");

		if (!beforeSnap || !afterSnap) return;

		const beforeData = beforeSnap.data() as
			| TypeDishData
			| TypePrepData
			| TypeIngredientData;
		const afterData = afterSnap.data() as
			| TypeDishData
			| TypePrepData
			| TypeIngredientData;

		/* When Reources Added or Deleted or Changed */
		if ("resources" in beforeData && "resources" in afterData) {
			if (JSON.stringify(beforeData.resources) !== JSON.stringify(afterData.resources)) {
				for (const resourceID of Object.keys(afterData.resources)) {
					const beforeResource = beforeData.resources[resourceID];
					const afterResource = afterData.resources[resourceID];

					/* add new resource */
					if (beforeResource === undefined && afterResource !== undefined) {
						handleRelatedRecipe(resourceID, afterData, "tamaru", "add");

						/* delete resource */
					} else if (beforeResource !== undefined && afterResource === undefined) {
						handleRelatedRecipe(resourceID, afterData, "tamaru", "delete");

						/* Caluculate total cost */
					} else if (beforeResource.costPerUsageUnit != afterResource.costPerUsageUnit) {
						const dishDocRef = colRef.doc(updatedDocID);
						dishDocRef.update({
							[`resources.${afterData.docID}`]: {
								totalCost:
									afterData.resources[afterData.docID].costPerUsageUnit
									* afterData.resources[afterData.docID].usageAmount,
							}
						})
					}
				}
			}
		}

		/* When Change Prep or Ingredient info */
		if ("prep" == afterData.kind || "ingredient" == afterData.kind) {
			if (beforeData !== afterData) {

				Object.keys(afterData.dishRefs).forEach(async (dishID) => {
					const dishDocRef = colRef.doc(dishID);

					/* Change Dish Resource Info */
					dishDocRef.update({
						[`resources.${afterData.docID}`]: {
							costPerUsageUnit: afterData.costPerUsageUnit,
							kind: afterData.kind,
							name: afterData.name,
							resourceAllergens: structuredClone(afterData.allergen),
							usageUnit: afterData.usageUnit,
						}
					})
				});
			}
		}
	})