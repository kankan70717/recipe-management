import { onCall, HttpsError } from "firebase-functions/v2/https";
import { db } from "../../config";

export const getSetting = onCall(async (request) => {
	const auth = request.auth;
	if (!auth) {
		throw new HttpsError("unauthenticated", "You must be signed in to get settings.");
	}
	const collectionName = auth.token.group;

	if (!auth) {
		throw new HttpsError("unauthenticated", "You must be signed in to get settings.");
	}

	try {
		const docRef = db.collection(collectionName).doc("setting");
		const docSnap = await docRef.get();

		if (!docSnap.exists) {
			throw new HttpsError("not-found", "Setting document not found.");
		}

		return docSnap.data();

	} catch (err: unknown) {
		if (err instanceof Error) {
			throw new HttpsError("internal", err.message);
		}
		throw new HttpsError("internal", "Unknown error occurred");
	}
});
