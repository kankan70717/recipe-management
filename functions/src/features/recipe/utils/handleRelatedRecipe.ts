import { HttpsError } from "firebase-functions/https";
import { db } from "../../../config";
import { TypeDishData } from "../types/TypeDishData";
import { TypePrepData } from "../types/TypePrepData";

export const handleRelatedRecipe = async (
	resourceDocID: string,
	formData: TypeDishData | TypePrepData,
	group: string
) => {
	try {
		const colRef = db.collection(group);
		const docRef = colRef.doc(resourceDocID);

		const updateData: any = {};

		if (!resourceDocID) {
			throw new HttpsError("invalid-argument", "resourceDocID is missing");

		} else {
			updateData[`${formData.kind}Refs.${formData.docID}`] = {
				docID: formData.docID,
				name: formData.name,
				kind: formData.kind,
				image: formData.image
			};

			if (Object.keys(updateData).length > 0) {
				await docRef.update(updateData);
			}
		}
	} catch (error) {
		console.error("Error updating related recipe:", error);
	}
}