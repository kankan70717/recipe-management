import { z } from "zod";

export const ResourceSchema = z.object({
	kind: z.enum(["prep", "ingredient"]),
	name: z.string(),
	usageAmount: z.number(),
	usageUnit: z.string(),
	costPerUsageUnit: z.number(),
	totalCost: z.number(),
	removable: z.boolean(),
	resourceAllergens: z.record(
		z.string(),
		z.object({
			status: z.enum(["contained", "mayContained", "notContained", "removable", "unknown"]),
			items: z.record(
				z.string(),
				z.object({
					status: z.enum(["contained", "mayContained", "notContained", "removable", "unknown"]),
				})
			)
		})
	).optional(),
	substitute: z.array(z.string()).optional(),
});

export type ResourceSchemaType = z.infer<typeof ResourceSchema>;