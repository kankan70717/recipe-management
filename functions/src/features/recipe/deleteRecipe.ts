import { HttpsError, onCall } from "firebase-functions/https";
import { validateAuth } from "../../utils/validateAuth";
import { db } from "../../config";

export const deleteRecipe = onCall(async (request) => {
	const { group } = validateAuth(request.auth);
	const { docID } = request.data;

	try {
		await db.collection(group).doc(docID).delete();
		return { success: true, message: `Document ${docID} deleted successfully.` };

	} catch (err) {

		console.error(err);
		throw new HttpsError("internal", "Failed to delete document.");
	}
})
