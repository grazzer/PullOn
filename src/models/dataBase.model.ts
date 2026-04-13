import z from "zod";
import { competitionSchema, resultSchema } from "./validation/database.schema";

export type Comp = z.infer<typeof competitionSchema>;

export type result = z.infer<typeof resultSchema>;

export type user = {};
