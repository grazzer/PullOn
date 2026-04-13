import { z } from "zod";

export const compBuilderFormSchema = z.object({
  competitionName: z
    .string()
    .min(2, "name must be at least 2 characters.")
    .max(50, "name must be at most 50 characters."),
  //TODO: check this
  competitionDate: z.string().refine((dateStr) => {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  }, "Invalid date format. Please use a valid date string."),
  categories: z.array(
    z.object({
      // id: z.string(),
      name: z.optional(z.string()),
      ageLower: z.string(),
      ageUpper: z.string(),
      description: z.string(),
      rounds: z.array(
        z.object({
          // id: z.string(),
          stage: z.string(),
          name: z.optional(z.string()),
          maxCompetitors: z.string(),
          problemCount: z.string(),
          gradingStyle: z.string(),
        }),
      ),
    }),
  ),
});

export type CompBuilderForm = z.infer<typeof compBuilderFormSchema>;
