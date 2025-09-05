import { onCall, HttpsError, CallableRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions/v2";
import * as admin from "firebase-admin";
import { TypeUserData } from "./types/TypeUsers";

export const createNewUser = onCall<TypeUserData>(
	async (request: CallableRequest<TypeUserData>) => {
		const bucket = admin.storage().bucket();

		const data = request.data;
		const auth = request.auth;

		if (!auth || auth.token.role !== "admin") {
			throw new HttpsError("permission-denied", "Only admins can create users.");
		}

		try {
			// 1. create Auth
			const userRecord = await admin.auth().createUser({
				email: data.email,
				password: data.password,
				displayName: data.displayName,
			});

			// 2. upload photo to Storage
			let photoURL: string | null = null;
			if (data.photoBase64) {
				const buffer = Buffer.from(data.photoBase64, "base64");
				const file = bucket.file(`${data.group}/users/${userRecord.uid}/profile.jpg`);
				await file.save(buffer, {
					contentType: "image/jpeg",
					public: true,
				});

				photoURL = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
			}

			// 3. store data in Firestore
			await admin.firestore()
				.collection(data.group)
				.doc("users")
				.set({
					[`${userRecord.uid}`]: {
						uid: userRecord.uid,
						displayName: data.displayName,
						email: data.email,
						role: data.role,
						group: data.group,
						store: data.store,
						photoURL: photoURL,
						createdAt: admin.firestore.FieldValue.serverTimestamp(),
						updatedAt: admin.firestore.FieldValue.serverTimestamp(),
					}
				}, { merge: true });

			// 4. add custom claim
			await admin.auth().setCustomUserClaims(userRecord.uid, {
				role: data.role,
				group: data.group,
				store: data.store,
				photoURL: photoURL,
			});

			logger.info(`User ${userRecord.uid} created successfully`);

			return { uid: userRecord.uid, message: "User created successfully" };

		} catch (err: unknown) {
			if (err instanceof Error) {
				logger.error("Error creating user", err);
				throw new HttpsError("internal", err.message);
			}

			logger.error("Unknown error", err);
			throw new HttpsError("internal", "Unknown error occurred");
		}
	}
);