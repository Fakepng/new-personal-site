import { z } from "zod";

export const StaticPropsSchema = z.object({
  locale: z.string(),
});

export type Context = z.infer<typeof StaticPropsSchema>;
