import { HttpsError } from "firebase-functions/https";
import { AuthData } from "firebase-functions/tasks";

export const validateAuth = ((auth: AuthData | undefined) => {

	if (!auth) throw new HttpsError("unauthenticated", "You must be signed in.");

	const { store, group } = auth.token as { store?: string; group?: string };
	if (!store || !group) {
		throw new HttpsError("permission-denied", "Custom claims missing store or group.");
	}

	return { store, group };
})