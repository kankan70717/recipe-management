import z from "zod";
import type { TypeSetting } from "../../../types/TypeSetting";
import { createBaseRecipeSchema } from "./BaseRecipeSchema";
import { ResourceSchema } from "./ResourceSchema";

export function createPrepSchema(setting: TypeSetting) {

	return createBaseRecipeSchema(setting).extend({
		kind: z.literal("prep"),
		category: z.union(setting.prep.category.map(c => z.literal(c)) as [z.ZodLiteral<string>, ...z.ZodLiteral<string>[]]),
		instruction: z.string().optional(),
		totalCost: z.number().min(0),
		finishedAmount: z.number().min(0),
		usageUnit: z.string(),
		costPerUsageUnit: z.number(),
		tag: z.array(z.string()).optional(),
		resources: z.record(
			z.string(),
			ResourceSchema
		),

	});
}

export type PrepSchemaType = z.infer<typeof createPrepSchema>;
