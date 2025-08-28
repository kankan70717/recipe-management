import type { TypeFilterKind } from "../../pages/Filter/type/TypeFilter";
import type { TypeResourceAllergen } from "./TypeResourceAllergen";
import type { TypeResourceSubstitute } from "./TypeResourceSubstitute";

export type TypeResource = {
	"kind": TypeFilterKind;
	"name": string;
	"usageAmount": number;
	"usageUnit": string;
	"costPerUsageUnit":number;
	"totalCost": number;
	"removable": boolean;
	"resourceAllergens": Record<string, TypeResourceAllergen>;
	"substitute":Record<string, TypeResourceSubstitute>
}