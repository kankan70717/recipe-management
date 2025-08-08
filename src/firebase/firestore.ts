// src/firebase/firestore.ts
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";
import type { TypeFilterItem, TypeFilterPath } from "../components/Filter/types";


export async function fetchItems() {
	const querySnapshot = await getDocs(collection(db, "tamaru"));
	return console.log(querySnapshot.docs);
}

export async function getSetting() {
	const docId = "settings";
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
	filterPath: TypeFilterPath,
	filterItem: TypeFilterItem,
	status: "active" | "pending" | "inactive"
) {
	const collectionName = "tamaru";

	Object.entries(filterItem[filterPath].allergen).map(([AllergenCategory, obj]) => {

		if(obj.allSelected){
			
		}
	});

	const q = query(
		collection(db, collectionName),
		where("kind", "==", filterPath),
		where("status", "==", status),
	);
	const snapshot = await getDocs(q);
	return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
