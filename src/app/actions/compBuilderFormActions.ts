"use server";
import { compRepo } from "../../repo/compRepo";
import {
  CompBuilderForm,
  compBuilderFormSchema,
} from "../../models/validation/compBuilderform.schema";

export async function saveCompetitionData(
  data: CompBuilderForm,
): Promise<boolean> {
  // validation
  const validation = compBuilderFormSchema.parse(data);
  if (!validation) {
    throw new Error("Invalid competition data");
  }

  // format data for database
  const competitionData = {
    name: data.competitionName,
    date: new Date(data.competitionDate),
    locationId: 1,
    shape: { categories: data.categories },
  };

  // save data to database
  try {
    await compRepo.create(competitionData);
    return true;
  } catch (error) {
    throw new Error("Failed to save competition data: ");
  }
}
