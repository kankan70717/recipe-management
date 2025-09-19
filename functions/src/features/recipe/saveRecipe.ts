import { HttpsError, onCall } from "firebase-functions/https";
import { TypeDishData } from "./types/TypeDishData";
import { TypePrepData } from "./types/TypePrepData";
import { TypeIngredientData } from "./types/TypeIngredientData";
import { validateAuth } from "../../utils/validateAuth";
import { db } from "../../config";
import { resoucesToAllergen } from "./utils/resoucesToAllergen";
import { allergenToAllergenForFiilter } from "./utils/allergenToAllergenForFIilter";

export const saveRecipe = onCall(async (request) => {

	const { group } = validateAuth(request.auth);

	const formData = request.data as TypeDishData | TypePrepData | TypeIngredientData;
	if (!formData || !formData.kind) {
		throw new HttpsError("invalid-argument", "Invalid recipe data.");
	}

	try {
		const colRef = db.collection(group);
		const docRef = formData.docID
			? colRef.doc(formData.docID)
			: colRef.doc();

		let updatedFormData = {
			...structuredClone(formData),
			docID: formData.docID ? formData.docID : docRef.id
		};

		/* Dish or Prep */
		if (formData.kind === "prep" || formData.kind === "dish") {
			const updatedAllergen = resoucesToAllergen((formData as TypePrepData | TypeDishData).resources);
			const updateDatedAllergenForFilter = allergenToAllergenForFiilter(updatedAllergen);

			updatedFormData = {
				...structuredClone(updatedFormData),
				allergen: structuredClone(updatedAllergen),
				allergenForFilter: structuredClone(updateDatedAllergenForFilter),
			}

			try {
				docRef.set(updatedFormData, { merge: true });
			} catch (error) {
				console.error(`Error updating ${updatedFormData.docID} recipe:`, error);
			}

		}

		/* Ingredient */
		if (formData.kind === "ingredient") {
			const updateDatedAllergenForFilter = allergenToAllergenForFiilter(formData.allergen);
			updatedFormData = {
				...structuredClone(updatedFormData),
				allergenForFilter: structuredClone(updateDatedAllergenForFilter),
			}
			docRef.set(updatedFormData, { merge: true });
		}

	} catch (error) {
		console.error("Error creating document:", error);
	}
})