import type { TypeAllergenStatus } from "./TypeIngredientData";

export type TypeResourceAllergen = {
	"status": TypeAllergenStatus;
	"items": Record<string, { "status": TypeAllergenStatus }>;
}