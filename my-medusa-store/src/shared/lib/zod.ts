import { z } from "zod";

export const jsonString = z
  .string()
  .optional()
  .transform((val, ctx) => {
    if (!val || val.trim() === "") return null;

    try {
      return JSON.parse(val) as Record<string, unknown>;
    } catch (e) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid JSON format",
      });
      return z.NEVER;
    }
  });
