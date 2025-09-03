// src/firebase/firestore.ts
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db, storage } from "./config";
import type { TypeFilterItem, TypeFilterKind } from "../pages/Filter/type/TypeFilter";
import type { TypeIngredientData } from "../types/recipe/TypeIngredientData";
import type { TypePrepData } from "../types/recipe/TypePrepData";
import type { TypeDishData } from "../types/recipe/TypeDishData";
import { allergenToAllergenForFiilter } from "./allergenToAllergenForFIilter";
import { resoucesToAllergen } from "./resoucesToAllergen";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function customLoaders() {
	const [setting, users] = await Promise.all([getSetting(), getUsers()]);
	return { setting, users };
}
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

export async function getUsers() {
	const docId = "users";
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

export async function updateRecipe(formData: TypeIngredientData | TypePrepData | TypeDishData) {
	try {
		const docRef = doc(db, "tamaru", formData.docID);

		if (formData.kind == "prep" || formData.kind == "dish") {
			const updatedAllergen = resoucesToAllergen((formData as TypePrepData | TypeDishData).resources);
			const updateDatedAllergenForFilter = allergenToAllergenForFiilter(updatedAllergen);
			await updateDoc(docRef, {
				...structuredClone(formData),
				allergen: structuredClone(updatedAllergen),
				allergenForFilter: structuredClone(updateDatedAllergenForFilter)
			});

			if ("resources" in formData) {
				await Promise.all(
					Object.entries(formData.resources).map(([resourceID, _]) =>
						handleRelatedRecipe(formData.kind, resourceID, formData.docID, formData.name, formData.image as string)
					)
				);
			}

		} else {
			const updateDatedAllergenForFilter = allergenToAllergenForFiilter(formData.allergen);
			await updateDoc(docRef, {
				...structuredClone(formData),
				allergenForFilter: structuredClone(updateDatedAllergenForFilter)
			});
		}
		console.log("Document updated successfully!");
	} catch (error) {
		console.error("Error updating document:", error);
	}
}

export async function addRecipe(formData: TypeIngredientData | TypePrepData | TypeDishData) {
	try {
		const colRef = collection(db, "tamaru");
		const docRef = doc(colRef);
		const id = docRef.id;

		if (formData.kind == "prep" || formData.kind == "dish") {
			const updatedAllergen = resoucesToAllergen((formData as TypePrepData | TypeDishData).resources);
			const updateDatedAllergenForFilter = allergenToAllergenForFiilter(updatedAllergen);
			await setDoc(docRef, {
				...structuredClone(formData),
				docID: id,
				id: Math.floor(Math.random() * 1000000).toString(),
				allergen: structuredClone(updatedAllergen),
				allergenForFilter: structuredClone(updateDatedAllergenForFilter)
			});

		} else {
			const updateDatedAllergenForFilter = allergenToAllergenForFiilter(formData.allergen);
			await setDoc(docRef, {
				...structuredClone(formData),
				docID: id,
				id: Math.floor(Math.random() * 1000000).toString(),
				allergenForFilter: structuredClone(updateDatedAllergenForFilter)
			});
		}

		console.log("Document created successfully!");
	} catch (error) {
		console.error("Error creating document:", error);
	}
}

export async function deleteRecipe(docID: string) {
	const docRef = doc(db, "tamaru", docID);

	try {
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			console.warn(`Document ${docID} does not exist.`);
			return false;
		}

		await deleteDoc(docRef);
		console.log(`Recipe ${docID} deleted successfully.`);
		return true;

	} catch (error) {
		console.error("Error deleting recipe:", error);
		throw error;
	}
}

export async function handleRelatedRecipe(
	resourceKind: TypeFilterKind,
	resourceDocID: string,
	relatedRecipeID: string,
	relatedRecipeName: string,
	relatedRecipeImage: string,
) {
	try {
		const docRef = doc(db, "tamaru", resourceDocID);
		console.log(`${resourceKind}`);

		if (resourceKind === "prep") {
			console.log(`${relatedRecipeID}:${relatedRecipeName} is added in ${resourceDocID}`);
			await updateDoc(docRef, {
				[`prepRefs.${relatedRecipeID}`]: {
					name: relatedRecipeName,
					image: relatedRecipeImage
				},
			});
		} else if (resourceKind === "dish") {
			await updateDoc(docRef, {
				[`dishRefs.${relatedRecipeID}`]: {
					name: relatedRecipeName,
					image: relatedRecipeImage
				},
			});
		}

	} catch (error) {
		console.error("Error updating related recipe:", error);
	}
}

export async function uploadFileAndSaveURL(
	docPath: string,
	file: File,
	field: string,
) {
	try {
		const fileRef = ref(storage, `${docPath}/${file.name}`);
		await uploadBytes(fileRef, file);

		const fileURL = await getDownloadURL(fileRef);

		const docRef = doc(db, docPath);
		await updateDoc(docRef, { [field]: fileURL });

		console.log(`File uploaded and URL saved for ${docPath}: ${fileURL}`);
		return fileURL;

	} catch (error) {
		console.error("Error uploading file:", error);
		throw error;
	}
}