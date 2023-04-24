import { z } from "zod";

export const BlogSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
});

export type Blog = z.infer<typeof BlogSchema>;
