import { onDocumentUpdated } from "firebase-functions/firestore";
import { TypeIngredientData } from "../types/TypeIngredientData";
import { TypeDishData } from "../types/TypeDishData";
import { TypePrepData } from "../types/TypePrepData";
import { handleRelatedRecipe } from "../utils/handleRelatedRecipe";
import { db } from "../../../config";

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

		console.info(`${afterData.docID} ${afterData.name} is updated.`);

		/* When Reources Added or Deleted or Changed */
		if ("resources" in beforeData && "resources" in afterData) {
			if (JSON.stringify(beforeData.resources) !== JSON.stringify(afterData.resources)) {

				const allResourceIDs = new Set([
					...Object.keys(beforeData.resources),
					...Object.keys(afterData.resources)
				]);

				let totalCostOfAllResource = 0;
				for (const resourceID of allResourceIDs) {
					const beforeResource = beforeData.resources[resourceID];
					const afterResource = afterData.resources[resourceID];
					console.info(`Resource in ${afterData.docID} ${afterData.name} is updated.`);

					/* Add resource */
					if (beforeResource === undefined && afterResource !== undefined) {
						handleRelatedRecipe(resourceID, afterData, "tamaru", "add");
						console.info(`Resource ${resourceID} ${afterData.resources[resourceID].name} is added.`);
					}

					/* Delete resource */
					if (beforeResource !== undefined && afterResource === undefined) {
						handleRelatedRecipe(resourceID, afterData, "tamaru", "delete");
						console.info(`Resource ${resourceID} ${beforeData.resources[resourceID].name} is deleted.`);
					}

					/* Change Resource */
					if (beforeResource !== undefined && afterResource !== undefined) {

						/* Caluculate Total cost for Each Resource */
						if (beforeResource.costPerUsageUnit != afterResource.costPerUsageUnit) {
							const dishDocRef = colRef.doc(updatedDocID);
							await dishDocRef.update({
								[`resources.${resourceID}.totalCost`]:
									afterData.resources[resourceID].costPerUsageUnit
									* afterData.resources[resourceID].usageAmount,
							});
							console.info(`The Total Cost of Resource ${resourceID} ${beforeData.resources[resourceID].name} is changed.`);
						}
					}

					/* Caluculate Total Cost Of All Resource */
					if (afterResource !== undefined) {
						totalCostOfAllResource += afterData.resources[resourceID].costPerUsageUnit
							* afterData.resources[resourceID].usageAmount;
					}
				}

				/* Update Totall Cost of All Resource */
				if (afterData.kind == "prep") {
					const docRef = colRef.doc(updatedDocID);
					await docRef.update({
						[`totalCost`]: totalCostOfAllResource,
						[`costPerUsageUnit`]: totalCostOfAllResource / afterData.finishedAmount
					});
				}
			}
		}

		/* When Change Prep or Ingredient info */
		if ("prep" == afterData.kind || "ingredient" == afterData.kind) {
			if (JSON.stringify(beforeData) !== JSON.stringify(afterData)) {

				/* Change Dish Resource Info */
				for (const dishID of Object.keys(afterData.dishRefs)) {

					const dishDocRef = colRef.doc(dishID);

					await dishDocRef.update({
						[`resources.${afterData.docID}.costPerUsageUnit`]: afterData.costPerUsageUnit,
						[`resources.${afterData.docID}.kind`]: afterData.kind,
						[`resources.${afterData.docID}.name`]: afterData.name,
						[`resources.${afterData.docID}.resourceAllergens`]: structuredClone(afterData.allergen),
						[`resources.${afterData.docID}.usageUnit`]: afterData.usageUnit,
					});
				};

				/* Change Prep Resource Info */
				for (const prepID of Object.keys(afterData.prepRefs || {})) {
					const prepDocRef = colRef.doc(prepID);

					await prepDocRef.update({
						[`resources.${afterData.docID}.costPerUsageUnit`]: afterData.costPerUsageUnit,
						[`resources.${afterData.docID}.kind`]: afterData.kind,
						[`resources.${afterData.docID}.name`]: afterData.name,
						[`resources.${afterData.docID}.resourceAllergens`]: structuredClone(afterData.allergen),
						[`resources.${afterData.docID}.usageUnit`]: afterData.usageUnit,
					});
				};
			}
		}
	})