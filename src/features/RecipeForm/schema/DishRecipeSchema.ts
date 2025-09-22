import z from "zod";
import type { TypeSetting } from "../../../types/TypeSetting";
import { createBaseRecipeSchema } from "./BaseRecipeSchema";

export function createDishSchema(setting: TypeSetting) {

	return createBaseRecipeSchema(setting).extend({
		kind: z.literal("dish"),
		category: z.string().optional(), // from setting
		description: z.string().optional(),
		instruction: z.string().optional(),
		totalCost: z.number().min(0),
		sellPrice: z.number().min(0),
		tag: z.array(z.string()).optional(),
	});
}
