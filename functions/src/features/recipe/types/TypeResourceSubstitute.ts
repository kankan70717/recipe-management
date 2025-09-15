import type { TypeFilterKind } from "../../pages/Filter/type/TypeFilter";
import type { TypeResourceAllergen } from "./TypeResourceAllergen";

export type TypeResourceSubstitute = {
	"kind": TypeFilterKind;
	"name": string;
	"usageAmount": number;
	"usageUnit": string;
	"totalCost": number;
	"resourceAllergens": Record<string, TypeResourceAllergen>;
}