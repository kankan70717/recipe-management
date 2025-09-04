import type { TypeUserData } from "../types/users/TypeUsers";

export const initialUserData: TypeUserData = {
	uid: "",
	email: "",
	password: "",
	displayName: "",
	role: "viewer",
	group: "tamaru",
	store: "all",
	photoFile: undefined,
	photoBase64: undefined,
	createdAt: 0,
	updatedAt: 0
};
