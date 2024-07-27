import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  validity: z
    .tuple([z.date(), z.date()])
    .refine(([start, end]) => start < end, {
      message: "Start date must be before end date",
    }),
  actions: z
    .array(
      z.object({
        value: z.number(),
        label: z.string(),
        channels: z.array(z.string()),
      })
    )
    .min(1, "At least one action is required"),
  recommendationFlag: z.boolean().optional(),
  channels: z
    .record(
      z
        .number()
        .min(0, "Value must be at least 0")
        .max(99, "Value must be less than 100")
    )
    .optional(),
});
