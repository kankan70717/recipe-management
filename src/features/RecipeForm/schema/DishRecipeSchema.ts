import z from "zod";
import type { TypeSetting } from "../../../types/TypeSetting";
import { createBaseRecipeSchema } from "./BaseRecipeSchema";
import { ResourceSchema } from "./ResourceSchema";

export function createDishSchema(setting: TypeSetting) {

	return createBaseRecipeSchema(setting).extend({
		kind: z.literal("dish"),
		category: z.union(setting.dish.category.map(c => z.literal(c)) as [z.ZodLiteral<string>, ...z.ZodLiteral<string>[]]),
		description: z.string().optional(),
		instruction: z.string().optional(),
		totalCost: z.number().min(0),
		sellPrice: z.number().min(0),
		tag: z.array(z.string()).optional(),
		resources: z.record(
			z.string(),
			ResourceSchema
		),
		allergenForFilter: z.record(
			z.string(),
			z.enum(["contained", "mayContained", "notContained", "removable", "unknown"])
		),
		
	});
}

export type DishSchemaType = z.infer<typeof createDishSchema>;
