export type TypeCustomUserClaim = {
	role: "admin" | "editor" | "viewer";
	group: string;
	store: "all" | "raisu" | "toyokan" | "rajio" | "newFuji" | "kingyo" | "suika";
};