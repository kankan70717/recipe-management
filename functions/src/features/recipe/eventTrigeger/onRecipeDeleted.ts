import { onDocumentDeleted } from "firebase-functions/firestore";
import { TypeIngredientData } from "../types/TypeIngredientData";
import { TypeDishData } from "../types/TypeDishData";
import { TypePrepData } from "../types/TypePrepData";
import { db } from "../../../config";
import { FieldValue } from "firebase-admin/firestore";

export const onRecipeDeleted = onDocumentDeleted(
	"tamaru/{docID}",
	async (event) => {
		const deletedDocID = event.params.docID;

		const deletedData = event.data?.data() as
			| TypeDishData
			| TypePrepData
			| TypeIngredientData;

		console.info(`${deletedData.docID} ${deletedData.name} is deleted.`);

		const colRef = db.collection("tamaru");

		try {

			if ("dishRefs" in deletedData) {
				await Promise.all(
					Object.entries(deletedData.dishRefs).map(async ([dishID, dishObj]) => {
						const docRef = colRef.doc(dishID);
						await docRef.update({
							[`resources.${deletedDocID}`]: FieldValue.delete(),
						});
						console.info(`${dishID} ${dishObj.name} is deleted from [${deletedData.docID} ${deletedData.name}].`);
					})
				);
			}

			if ("prepRefs" in deletedData) {
				await Promise.all(
					Object.entries(deletedData.prepRefs).map(async ([prepID, prepObj]) => {
						const docRef = colRef.doc(prepID);
						await docRef.update({
							[`resources.${deletedDocID}`]: FieldValue.delete(),
						});
						console.info(`${prepID} ${prepObj.name} is deleted from [${deletedData.docID} ${deletedData.name}].`);
					})
				);
			}

			if ("resources" in deletedData) {
				await Promise.all(
					Object.entries(deletedData.resources).map(async ([resourceID, resourceObj]) => {
						const docRef = colRef.doc(resourceID);

						if (deletedData.kind == "dish") {
							await docRef.update({
								[`dishRefs.${deletedData.docID}`]: FieldValue.delete(),
							});
							console.info(`[${deletedData.docID} ${deletedData.name}] is deleted from dishRefs in ${resourceID} ${resourceObj.name}.`);

						} else if (deletedData.kind == "prep") {
							await docRef.update({
								[`prepRefs.${deletedData.docID}`]: FieldValue.delete(),
							});
							console.info(`[${deletedData.docID} ${deletedData.name}] is deleted from prepRefs in ${resourceID} ${resourceObj.name}.`);
						}
					})
				)
			}

		} catch (error) {
			console.error("Error deleting recipe:", error);
			throw error;
		}
	})