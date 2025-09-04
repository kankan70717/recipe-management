import { CallableRequest, HttpsError, onCall } from "firebase-functions/https";
import { TypeUserData } from "./types/TypeUsers";
import * as admin from "firebase-admin";
import { logger } from "firebase-functions";

admin.initializeApp();
const bucket = admin.storage().bucket();

export const updateUser = onCall<TypeUserData>(
	async (request: CallableRequest<TypeUserData>) => {
		const data = request.data;
		const auth = request.auth;

		if (!auth || auth.token.role !== "admin") {
			throw new HttpsError("permission-denied", "Only admins can update users.");
		}

		try {
			// 1. update Auth user
			const updatePayload: admin.auth.UpdateRequest = {};
			if (data.displayName) updatePayload.displayName = data.displayName;
			if (data.email) updatePayload.email = data.email;
			if (data.password) updatePayload.password = data.password;

			if (Object.keys(updatePayload).length > 0) {
				await admin.auth().updateUser(data.uid, updatePayload);
			}

			// 2. upload new photo if provided
			let photoURL: string | null = null;
			if (data.photoBase64) {
				const buffer = Buffer.from(data.photoBase64, "base64");
				const file = bucket.file(`${data.group}/users/${data.uid}/profile.jpg`);
				await file.save(buffer, {
					contentType: "image/jpeg",
					public: true,
				});

				photoURL = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
			}

			// 3. update Firestore (users doc 内の uid フィールドを更新)
			const updateData: Record<string, unknown> = {
				[`${data.uid}.updatedAt`]: admin.firestore.FieldValue.serverTimestamp(),
			};
			if (data.displayName) updateData[`${data.uid}.displayName`] = data.displayName;
			if (data.email) updateData[`${data.uid}.email`] = data.email;
			if (data.role) updateData[`${data.uid}.role`] = data.role;
			if (data.group) updateData[`${data.uid}.group`] = data.group;
			if (data.store) updateData[`${data.uid}.store`] = data.store;
			if (photoURL) updateData[`${data.uid}.photoURL`] = photoURL;

			await admin.firestore()
				.collection(data.group)
				.doc("users")
				.set(updateData, { merge: true });

			// 4. update custom claims
			const customClaims: Record<string, any> = {};
			if (data.role) customClaims.role = data.role;
			if (data.group) customClaims.group = data.group;
			if (data.store) customClaims.store = data.store;
			if (photoURL) customClaims.photoURL = photoURL;

			if (Object.keys(customClaims).length > 0) {
				await admin.auth().setCustomUserClaims(data.uid, customClaims);
			}

			logger.info(`User ${data.uid} updated successfully`);

			return { uid: data.uid, message: "User updated successfully" };

		} catch (err: unknown) {
			if (err instanceof Error) {
				logger.error("Error updating user", err);
				throw new HttpsError("internal", err.message);
			}
			logger.error("Unknown error", err);
			throw new HttpsError("internal", "Unknown error occurred");
		}
	}
);