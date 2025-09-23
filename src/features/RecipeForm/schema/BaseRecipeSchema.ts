import { z } from "zod";
import type { TypeSetting } from "../../../types/TypeSetting";

export function createBaseRecipeSchema(setting: TypeSetting) {

	return z.object({
		docID: z.string().optional(),
		id: z.string().optional(),
		status: z.enum(["active", "inactive", "pending"]),
		store: z.union(setting.store.map(s => z.literal(s.name)) as [z.ZodLiteral<string>, ...z.ZodLiteral<string>[]]),
		name: z.string().optional(),
		nameJa: z.string().optional(),
		searchKeywords: z.array(z.string()).optional(),
		image: z.union([z.string(), z.instanceof(File)]),
	});
}