// src/firebase/firestore.ts
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./config";


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
