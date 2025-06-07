
export type TypeMainContentKind = {
	kind: "search" | "ingredient" | "prep" | "dish";
}
export type TypeMainContentAction = {
	type: "SET_KIND";
	payload: TypeMainContentKind["kind"];
}