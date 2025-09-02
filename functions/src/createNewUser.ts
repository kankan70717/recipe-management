import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

admin.initializeApp();

type TypeCustomUserClaim = {
	role: string;
	group: string;
	store: string;
}

interface CreateUserData {
	email: string;
	password: string;
	displayName: string;
	role: string;
	group?: string;
	store?: string;
	photoURL?: string;
}

export const createNewUser = functions.https.onCall<CreateUserData>(
	async (data, context) => {
		// 認証済みかつ admin 権限のユーザーだけ許可
		if (context?.auth?.token.role !== "admin") {
			throw new functions.https.HttpsError(
				"permission-denied",
				"Only admins can create users."
			);
		}

		try {
			// Authentication にユーザー作成
			const userRecord = await admin.auth().createUser({
				email: data.email,
				password: data.password,
				displayName: data.displayName,
			});

			// Firestore に保存
			await admin.firestore().collection("tamaru").doc(userRecord.uid).set({
				displayName: data.displayName,
				email: data.email,
				role: data.role,
				group: data.group || "tamaru",
				store: data.store || "all",
				photoURL: data.photoURL || null,
				createdAt: FieldValue.serverTimestamp(),
				updatedAt: FieldValue.serverTimestamp(),
			});

			// カスタムクレームで role を付与
			await admin.auth().setCustomUserClaims(userRecord.uid, {
				role: data.role,
			});

			return { uid: userRecord.uid, message: "User created successfully" };
		} catch (err: any) {
			console.error("Error creating user:", err);
			throw new functions.https.HttpsError("internal", err.message);
		}
	}
);
