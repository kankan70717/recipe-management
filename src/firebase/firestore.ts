// src/firebase/firestore.ts
import { collection, deleteDoc, deleteField, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "./config";
import type {  TypeFilterKind } from "../pages/Filter/type/TypeFilter";
import type { TypeIngredientData } from "../types/recipe/TypeIngredientData";
import type { TypePrepData } from "../types/recipe/TypePrepData";
import type { TypeDishData } from "../types/recipe/TypeDishData";
import { allergenToAllergenForFiilter } from "./allergenToAllergenForFIilter";
import { resoucesToAllergen } from "./resoucesToAllergen";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import type { TypeResource } from "../types/recipe/TypeResource";
import type { TypeSetting } from "../types/TypeSetting";

/* export async function getSetting() {
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
} */

/* export async function getUsers() {
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
} */

/* export function fetchRecipeSnapshot(
	currentKind: TypeFilterKind,
	filterItem: TypeFilterItem,
	setData: (data: (TypeIngredientData | TypePrepData | TypeDishData)[] | null) => void,
	setDetailData: (item: TypeIngredientData | TypePrepData | TypeDishData) => void,
	store: string
) {
	const collectionName = "tamaru";

	const filterAllergen = Object.entries(filterItem[currentKind].allergen).flatMap(
		([allergenCategory, obj]) => {
			if (obj.allSelected) {
				return [where(`allergenForFilter.${allergenCategory}`, "in", ["removable", "notContained", "unknown"])];
			} else {
				return Object.entries(obj.items).flatMap(([allergen, selected]) => {
					if (selected) return [where(`allergenForFilter.${allergen}`, "in", ["removable", "notContained", "unknown"])];
					return [];
				});
			}
		});

	const filterCategory = Object.entries(filterItem[currentKind].category).flatMap(
		([item, selected]) => selected ? [where("category", "==", item)] : []);

	const filterTag = Object.entries(filterItem[currentKind].tag)
		.flatMap(([item, selected]) => selected ? [where(`tag.${item}`, "==", true)] : []);

	const storeFilter = store !== "all" ? [where("store", "==", store)] : [];

	const q = query(
		collection(db, collectionName),
		...storeFilter,
		where("kind", "==", currentKind),
		where("status", "==", "active"),
		...filterAllergen,
		...filterCategory,
		...filterTag,
	);

	const unsubscribe = onSnapshot(q, (snapshot) => {
		const liveData = snapshot.docs.map(doc => ({
			docID: doc.id,
			...doc.data()
		}));

		if (liveData.length === 0) {
			setData([]);
			return;
		}

		if (liveData.length > 0 && currentKind == "ingredient") {
			setData(liveData as TypeIngredientData[]);
			setDetailData(liveData[0] as TypeIngredientData);
		} else if (liveData.length > 0 && currentKind == "prep") {
			setData(liveData as TypePrepData[]);
			setDetailData(liveData[0] as TypePrepData);
		} else if (liveData.length > 0 && currentKind == "dish") {
			setData(liveData as TypeDishData[]);
			setDetailData(liveData[0] as TypeDishData);
		}
	});

	return unsubscribe;
} */

export async function updateRecipe(formData: TypeIngredientData | TypePrepData | TypeDishData) {
	try {
		let imageURL: string;
		if (formData.image instanceof File) {
			imageURL = await uploadFileAndReturnURL(formData.kind, formData.docID, formData.image);
		} else {
			imageURL = formData.image;
		}
		formData.image = imageURL;

		const docRef = doc(db, "tamaru", formData.docID);
		if (formData.kind == "prep" || formData.kind == "dish") {
			const updatedAllergen = resoucesToAllergen((formData as TypePrepData | TypeDishData).resources);
			const updateDatedAllergenForFilter = allergenToAllergenForFiilter(updatedAllergen);
			await updateDoc(docRef, {
				...structuredClone(formData),
				allergen: structuredClone(updatedAllergen),
				allergenForFilter: structuredClone(updateDatedAllergenForFilter),
			});

			if ("resources" in formData) {
				await Promise.all(
					Object.entries(formData.resources).map(([resourceID, resourceObj]) =>
						handleRelatedRecipe(resourceObj.kind, resourceID, formData.docID, formData.kind, formData.name, imageURL)
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

		if ("dishRefs" in formData) {
			Object.entries(formData.dishRefs).forEach(async ([dishID, _]) => {
				const docRef = doc(db, "tamaru", dishID);
				try {
					const docSnap = await getDoc(docRef);
					if (docSnap.exists()) {
						const dishData = docSnap.data();
						const usageAmount = dishData.resources?.[formData.docID]?.usageAmount ?? 0;

						const updatedResource = {
							costPerUsageUnit: formData.costPerUsageUnit,
							kind: formData.kind,
							name: formData.name,
							resourceAllergens: structuredClone(formData.allergen),
							totalCost: formData.costPerUsageUnit * usageAmount,
							usageAmount,
							usageUnit: formData.usageUnit,
						} as TypeResource;

						const updatedResources = {
							...dishData.resources,
							[formData.docID]: updatedResource,
						};

						const dishTotalCost = Object.values(updatedResources).reduce(
							(sum, resource: any) => sum + (resource.totalCost ?? 0),
							0
						);

						const updatedAllergen = resoucesToAllergen(updatedResources);

						const updateDatedAllergenForFilter = allergenToAllergenForFiilter(updatedAllergen);

						await updateDoc(docRef, {
							resources: updatedResources,
							totalCost: dishTotalCost,
							allergen: structuredClone(updatedAllergen),
							allergenForFilter: structuredClone(updateDatedAllergenForFilter),
						});

					} else {
						throw new Error(`Dish document ${dishID} does not exist`);
					}
				} catch (error) {
					throw new Error(`Dish document ${dishID} does not exist`);
				}
			});
		}

		if ("prepRefs" in formData) {
			Object.entries(formData.prepRefs).forEach(async ([prepID, _]) => {
				const docRef = doc(db, "tamaru", prepID);
				try {
					const docSnap = await getDoc(docRef);
					if (docSnap.exists()) {
						const prepData = docSnap.data();
						const usageAmount = prepData.resources?.[formData.docID]?.usageAmount ?? 0;

						const updatedResource = {
							costPerUsageUnit: formData.costPerUsageUnit,
							kind: formData.kind,
							name: formData.name,
							resourceAllergens: structuredClone(formData.allergen),
							totalCost: formData.costPerUsageUnit * usageAmount,
							usageAmount,
							usageUnit: formData.usageUnit,
						} as TypeResource;

						const updatedResources = {
							...prepData.resources,
							[formData.docID]: updatedResource,
						};

						const prepTotalCost = Object.values(updatedResources).reduce(
							(sum, resource: any) => sum + (resource.totalCost ?? 0),
							0
						);

						const updatedAllergen = resoucesToAllergen(updatedResources);

						const updateDatedAllergenForFilter = allergenToAllergenForFiilter(updatedAllergen);

						await updateDoc(docRef, {
							resources: updatedResources,
							totalCost: prepTotalCost,
							allergen: structuredClone(updatedAllergen),
							allergenForFilter: structuredClone(updateDatedAllergenForFilter),
						});

						/* updating related recipe of related recipe  */
						const updatedDocSnap = await getDoc(docRef);
						if (docSnap.exists()) {
							const updatedData = updatedDocSnap.data();
							updateRecipe(updatedData as TypeIngredientData | TypePrepData | TypeDishData);
						}

					} else {
						throw new Error(`Dish document ${prepID} does not exist`);
					}
				} catch (error) {
					throw new Error(`Dish document ${prepID} does not exist`);
				}
			});
		}

		console.log("Document updated successfully!");

	} catch (error) {
		console.error("Error updating document:", error);
	}
}

/* export async function addRecipe(formData: TypeIngredientData | TypePrepData | TypeDishData) {
	try {
		const colRef = collection(db, "tamaru");
		const docRef = doc(colRef);
		const id = docRef.id;

		// 画像アップロード処理
		let imageURL: string | undefined;
		if (formData.image instanceof File) {
			imageURL = await uploadFileAndReturnURL(formData.kind, id, formData.image);
		} else {
			imageURL = formData.image;
		}
		formData.image = imageURL;

		if (formData.kind === "prep" || formData.kind === "dish") {
			const updatedAllergen = resoucesToAllergen((formData as TypePrepData | TypeDishData).resources);
			const updateDatedAllergenForFilter = allergenToAllergenForFiilter(updatedAllergen);

			await setDoc(docRef, {
				...structuredClone(formData),
				docID: id,
				id: Math.floor(Math.random() * 1000000).toString(),
				allergen: structuredClone(updatedAllergen),
				allergenForFilter: structuredClone(updateDatedAllergenForFilter),
				image: imageURL
			});

			if ("resources" in formData) {
				await Promise.all(
					Object.entries(formData.resources).map(([resourceID, resourceObj]) =>
						handleRelatedRecipe(resourceObj.kind, resourceID, docRef.id, formData.kind, formData.name, imageURL)
					)
				);
			}

		} else {
			const updateDatedAllergenForFilter = allergenToAllergenForFiilter(formData.allergen);

			await setDoc(docRef, {
				...structuredClone(formData),
				docID: id,
				id: Math.floor(Math.random() * 1000000).toString(),
				allergenForFilter: structuredClone(updateDatedAllergenForFilter),
				image: imageURL
			});
		}

		console.log("Document created successfully!");
	} catch (error) {
		console.error("Error creating document:", error);
	}
} */

export async function deleteRecipe(detailData: TypeIngredientData | TypePrepData | TypeDishData) {
	const docID = detailData.docID;
	const docRef = doc(db, "tamaru", docID);

	try {
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			console.warn(`Document ${docID} does not exist.`);
			return false;
		}

		await deleteDoc(docRef);

		if ("dishRefs" in detailData) {
			await Promise.all(
				Object.keys(detailData.dishRefs).map(async (dishID) => {
					const docRef = doc(db, "tamaru", dishID);
					await updateDoc(docRef, {
						[`resources.${detailData.docID}`]: deleteField()
					});
				})
			);
		}

		if ("prepRefs" in detailData) {
			await Promise.all(
				Object.keys(detailData.prepRefs).map(async (prepID) => {
					const docRef = doc(db, "tamaru", prepID);
					await updateDoc(docRef, {
						[`resources.${detailData.docID}`]: deleteField()
					});
				})
			);
		}

		if ("resources" in detailData) {
			await Promise.all(
				Object.keys(detailData.resources).map(async (resourceID) => {
					const docRef = doc(db, "tamaru", resourceID);
					if (detailData.kind == "dish") {
						await updateDoc(docRef, {
							[`dishRefs.${detailData.docID}`]: deleteField()
						});
						console.log(`dishRefs ${detailData.docID} deleted successfully.`);
					} else if (detailData.kind == "prep") {
						await updateDoc(docRef, {
							[`prepRefs.${detailData.docID}`]: deleteField()
						});
						console.log(`prepRefs ${detailData.docID} deleted successfully.`);
					}
				})
			);
		}

		console.log(`Recipe ${docID} deleted successfully.`);
		return true;

	} catch (error) {
		console.error("Error deleting recipe:", error);
		throw error;
	}
}

/* export async function handleRelatedRecipe(
	resourceKind: TypeFilterKind,
	resourceDocID: string,
	relatedRecipeID: string,
	relatedRecipeKind: TypeFilterKind,
	relatedRecipeName: string,
	relatedRecipeImage: string,
) {
	try {
		const docRef = doc(db, "tamaru", resourceDocID);
		console.log(`${resourceKind}`);

		const updateData: any = {};

		if (!relatedRecipeID) {
			console.error("relatedRecipeID is missing");
		} else {
			const docRef = doc(db, "tamaru", resourceDocID);
			const updateData: any = {};

			if (relatedRecipeKind === "dish") {
				updateData[`dishRefs.${relatedRecipeID}`] = {
					name: relatedRecipeName,
					image: relatedRecipeImage,
				};
			} else if (relatedRecipeKind === "prep") {
				updateData[`prepRefs.${relatedRecipeID}`] = {
					name: relatedRecipeName,
					image: relatedRecipeImage,
				};
			}

			if (Object.keys(updateData).length > 0) {
				await updateDoc(docRef, updateData);
			}
		}

		await updateDoc(docRef, updateData);

	} catch (error) {
		console.error("Error updating related recipe:", error);
	}
} */

export async function uploadFileAndReturnURL(
	kind: TypeFilterKind,
	docID: string,
	file: File,
) {
	try {
		const fileRef = ref(storage, `/tamaru/${kind}/${docID}/${file.name}`);
		await uploadBytes(fileRef, file);

		const fileURL = await getDownloadURL(fileRef);

		console.log(`File uploaded and URL saved for ${docID}: ${fileURL}`);
		return fileURL;

	} catch (error) {
		console.error("Error uploading file:", error);
		throw error;
	}
}

export async function updateSetting(formData: TypeSetting) {
	const docRef = doc(db, "tamaru", "setting");
	try {
		await updateDoc(docRef, structuredClone(formData));
	} catch (error) {
		console.error("Failed to update setting:", error);
		throw error;
	}
}
