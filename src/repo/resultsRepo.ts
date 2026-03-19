import { prisma } from "../lib/prisma";
import { iResultRepo } from "./iResultRepo";
import { result } from "../models/dataBase.model";
import { resultSchema } from "../models/validation/database.schema";

class ResultsRepo implements iResultRepo {
  async getByCompId(compId: number): Promise<result[] | null> {
    try {
      const results = await prisma.result.findMany({
        where: { competitionId: compId },
        omit: { createdAt: true, updatedAt: true },
      });
      const mapped = results.map((result) =>
        resultSchema.parse({
          id: result.id,
          competitionId: result.competitionId,
          athleteId: result.athleteId,
          score: result.score,
          position: result.position,
        }),
      );
      resultSchema.array().parse(mapped);
      return mapped;
    } catch (error) {
      console.error("Error fetching results by competition id:", error);
      throw error;
    }
  }
  async getByUserId(userId: string): Promise<result[] | null> {
    try {
      const results = await prisma.result.findMany({
        where: { athleteId: userId },
        omit: { createdAt: true, updatedAt: true },
      });
      const mapped = results.map((result) =>
        resultSchema.parse({
          id: result.id,
          competitionId: result.competitionId,
          athleteId: result.athleteId,
          score: result.score,
          position: result.position,
        }),
      );
      resultSchema.array().parse(mapped);
      return mapped;
    } catch (error) {
      console.error("Error fetching results by user id:", error);
      throw error;
    }
  }

  async create(result: Partial<result>): Promise<result> {
    // TODO: authentication and authorization
    try {
      const createdResult = await prisma.result.create({
        data: {
          athlete: { connect: { id: result.athleteId } },
          competition: { connect: { id: result.competitionId } },
          category: result.category,
          round: result.round,
          score: result.score,
        },
        omit: { createdAt: true, updatedAt: true },
      });
      // Map createdResult to result type using resultSchema
      const mappedResult = resultSchema.parse({
        id: createdResult.id,
        competitionId: createdResult.competitionId,
        athleteId: createdResult.athleteId,
        score: createdResult.score,
        position: createdResult.position,
      });
      return mappedResult;
    } catch (error) {
      console.error("Error creating results:", error);
      throw error;
    }
  }
}

export const resultsRepo = new ResultsRepo();
