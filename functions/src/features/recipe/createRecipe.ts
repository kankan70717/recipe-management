import { HttpsError, onCall } from "firebase-functions/https";
import { TypeDishData } from "./types/TypeDishData";
import { TypePrepData } from "./types/TypePrepData";
import { TypeIngredientData } from "./types/TypeIngredientData";
import { validateAuth } from "../../utils/validateAuth";
import { db } from "../../config";
import { handleRelatedRecipe } from "./utils/handleRelatedRecipe";

export const createRecipe = onCall(async (request) => {

	const { group } = validateAuth(request.auth);

	const formData = request.data as TypeDishData | TypePrepData | TypeIngredientData;
	if (!formData || !formData.kind) {
		throw new HttpsError("invalid-argument", "Invalid recipe data.");
	}

	try {
		const colRef = db.collection(group);
		const docRef = colRef.doc();
		const docId = docRef.id;
		const updatedFormData = {
			...structuredClone(formData),
			docID: docId
		};

		if (formData.kind === "prep" || formData.kind === "dish") {
			if ("resources" in formData) {
				const resourcePromises = Object.keys(formData.resources).map((resourceID) =>
					handleRelatedRecipe(resourceID, formData, group)
				);
				await Promise.all([docRef.set(updatedFormData), ...resourcePromises]);
			}

		} else {
			await docRef.set({
				...structuredClone(formData),
				docID: docId
			});
		}
	} catch (error) {
		console.error("Error creating document:", error);
	}
})