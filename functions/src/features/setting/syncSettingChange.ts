/* import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const syncDocumentChanges = functions.firestore
	.onDocumentUpdated("collectionName/setting",
		async (event) => {
			const afterData = event.data?.after;

			if (!afterData) return;

			console.log(`Document "setting" updated:`, afterData);

			const promises = relatedDocs.map(async (relatedId) => {
				const relatedRef = db.collection("collectionName").doc(relatedId);
				const relatedSnap = await relatedRef.get();
				if (!relatedSnap.exists) return;

				await relatedRef.update({
					name: afterData.name,           // 同期したいフィールド
					updatedAt: admin.firestore.FieldValue.serverTimestamp(),
				});
			});

			await Promise.all(promises);
		}
	); */