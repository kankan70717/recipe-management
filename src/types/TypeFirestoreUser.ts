export type TypeFirestoreUsers = Record<string, TypeFirestoreUser>

export type TypeFirestoreUser = {
	displayName: string;
	email: string;
	role: "admin" | "editor" | "viewer";
	group: string;
	store: "all" | "raisu" | "toyokan" | "rajio" | "newFuji" | "kingyo" | "suika";
	photoURL?: string;
	createdAt: number;
	updatedAt: number;
}

