// src/firebase/auth.ts
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";

export const loginWithEmailPassword = async (email: string, password: string) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return userCredential.user;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
