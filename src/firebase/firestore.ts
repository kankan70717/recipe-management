// src/firebase/firestore.ts
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";
import type { TypeFilterItem, TypeFilterKind } from "../components/Filter/types";

export async function getSetting() {
	const docId = "setting";
	const collectionName = "tamaru";

	const docRef = doc(db, collectionName, docId);

	try {
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const data = docSnap.data();
			console.log("Document data:", data);
			return data;
		}
	} catch (error) {
		console.error("Error getting document:", error);
	}
}

export async function fetchRecipe(
	currentKind: TypeFilterKind,
	filterItem: TypeFilterItem,
) {
	const collectionName = "tamaru";

	const filterAllergen = Object.entries(filterItem[currentKind].allergen)
		.flatMap(([allergenCategory, obj]) => {
			if (obj.allSelected) {
				return [where(`allergenForFilter.${allergenCategory}`, "in", ["removable", "notContained", "unknown"])];
			} else {
				return Object.entries(obj.items).flatMap(([allergen, selected]) => {
					if (selected == true) {
						return [where(`allergenForFilter.${allergen}`, "in", ["removable", "notContained", "unknown"])];
					} else {
						return [];
					}
				})
			}
		});

	const filterCategory = Object.entries(filterItem[currentKind].category).flatMap(([item, selected]) => {
		if (selected === true) {
			return [where(`category.${item}`, "==", true)];
		} else {
			return [];
		}
	});

	const filterTag = Object.entries(filterItem[currentKind].tag).flatMap(([item, selected]) => {
		if (selected === true) {
			return [where(`tag.${item}`, "==", true)];
		} else {
			return [];
		}
	});

	// Max "where 5"
	const q = query(
		collection(db, collectionName),
		where("kind", "==", currentKind),
		where("status", "==", "active"),
		...filterAllergen,
		...filterCategory, 
		...filterTag
	);

	const snapshot = await getDocs(q);
	return snapshot.docs.map(doc => ({
		docID: doc.id,
		...doc.data()
	}));
}
