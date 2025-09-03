type TypeCustomUserClaim = {
	role: "admin" | "editor" | "viewer";
	group: string;
	store: "all" | "raisu" | "toyokan" | "rajio" | "newFuji" | "kingyo" | "suika";
};

export type TypeCreateUserData = TypeCustomUserClaim & {
	email: string;
	password: string;
	displayName: string;
	photoFile?: File;
	photoBase64?:string
	createdAt: number,
	updatedAt: number
};