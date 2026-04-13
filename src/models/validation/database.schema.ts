import { z } from "zod";

const id = z.optional(z.int().positive());

export const resultSchema = z
  .object({
    id: id,
    competitionId: id,
    athleteId: z.string().min(1).max(255),
    category: z.string().min(1).max(255),
    round: z.string().min(1).max(255),
    score: z.json(),
    position: z.optional(z.int().positive()),
  })
  .strict();

export const competitionSchema = z
  .object({
    id: id,
    name: z.string().min(1).max(255),
    date: z.date(),
    locationId: id,
    results: z.optional(z.array(resultSchema)),
    shape: z.json(),
    description: z.optional(z.string().max(1000)),
  })
  .strict();

export const competitionArraySchema = z.array(competitionSchema);
