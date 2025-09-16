import { onCall, HttpsError } from "firebase-functions/v2/https";
import { TypeFilterItem } from "./types/TypeFilter";
import { db } from "../../config";
import { logger } from "firebase-functions";
import { validateAuth } from "../../utils/validateAuth";

export const getRecipe = onCall(async (request) => {

	const { store, group } = validateAuth(request.auth);

	const { filterItem } = request.data as { filterItem: TypeFilterItem };
	if (!filterItem || !filterItem.currentKind) {
		throw new HttpsError("invalid-argument", "filterItem or currentKind is missing.");
	}

	try {
		const collectionRef = db.collection(group);

		let queryRef: FirebaseFirestore.Query = collectionRef
			.where("kind", "==", filterItem.currentKind)
			.where("status", "==", filterItem[filterItem.currentKind].status);

		// store filter
		if (store !== "all") queryRef = queryRef.where("store", "==", store);

		// allergen filter
		Object.entries(filterItem[filterItem.currentKind].allergen).forEach(([category, obj]) => {
			if (obj.allSelected) {
				queryRef = queryRef.where(`allergenForFilter.${category}`, "in", ["removable", "notContained", "unknown"]);
			} else {
				Object.entries(obj.items).forEach(([allergen, isSelected]) => {
					if (isSelected) {
						queryRef = queryRef.where(
							`allergenForFilter.${allergen}`,
							"in",
							["removable", "notContained", "unknown"]
						);
					}
				});
			}
		});

		// category filter
		Object.entries(filterItem[filterItem.currentKind].category).forEach(([item, selected]) => {
			if (selected) queryRef = queryRef.where("category", "==", item);
		});

		// tag filter
		Object.entries(filterItem[filterItem.currentKind].tag).forEach(([tag, selected]) => {
			if (selected) queryRef = queryRef.where(`tag.${tag}`, "==", true);
		});

		logger.debug("Final queryRef:", queryRef);

		const snapshot = await queryRef.get();
		const data = snapshot.docs.map(doc => ({ docID: doc.id, ...doc.data() }));

		return data;

	} catch (err) {
		console.error("Error fetching recipes:", err);
		const message = err instanceof Error ? err.message : String(err);

		throw new HttpsError("internal", message);
	}
});
