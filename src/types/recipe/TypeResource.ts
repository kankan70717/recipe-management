import type { TypeFilterKind } from "../../components/Filter/types";
import type { TypeResourceAllergen } from "./TypeResourceAllergen";
import type { TypeResourceSubstitute } from "./TypeResourceSubstitute";

export type TypeResource = {
	"kind": TypeFilterKind;
	"name": string;
	"usageAmount": number;
	"usageUnit": string;
	"totalCost": number;
	"removable": boolean;
	"resourceAllergens": Record<string, TypeResourceAllergen>;
	"substitute":Record<string, TypeResourceSubstitute>
}