// src/firebase/firestore.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";


export async function fetchItems() {
	const querySnapshot = await getDocs(collection(db, "tamaru"));
	return console.log(querySnapshot.docs);
}
