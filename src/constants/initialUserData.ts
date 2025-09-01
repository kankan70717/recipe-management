import type { TypeFirestoreUser } from "../types/TypeFirestoreUser";

export const initialUserData: TypeFirestoreUser = {
	displayName: "",
	email: "",
	role: "viewer",
	group: "tamaru",
	store: "all",
	photoURL: undefined,
	createdAt: 0,
	updatedAt: 0
};
