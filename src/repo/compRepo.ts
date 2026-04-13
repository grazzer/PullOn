import { iCompRepo } from "./iCompRepo.interface";
import { prisma } from "../lib/prisma";
import { Comp } from "../models/dataBase.model";
import {
  competitionArraySchema,
  competitionSchema,
} from "../models/validation/database.schema";
import { getSession } from "../lib/getSession";

//TODO: handle errors

class CompRepo implements iCompRepo {
  async getAll(): Promise<Comp[] | null> {
    try {
      const results = await prisma.competition.findMany({
        omit: {
          createdAt: true,
          updatedAt: true,
        },
      });
      competitionArraySchema.parse(results);
      return results;
    } catch (error) {
      console.error("Error fetching competitions:", error);
      throw error;
    }
  }

  async getById(id: number) {
    try {
      competitionSchema.shape.id.parse(id);
      const result = await prisma.competition.findUnique({
        where: { id },
        omit: { createdAt: true, updatedAt: true },
      });
      competitionSchema.parse(result);
      return result;
    } catch (error) {
      console.error("Error fetching competition by id:", error);
      throw error;
    }
  }
  async getByLocationId(locationId: number) {
    try {
      competitionSchema.shape.locationId.parse(locationId);
      const result = await prisma.competition.findMany({
        where: { locationId },
        omit: { createdAt: true, updatedAt: true },
      });
      competitionSchema.parse(result);
      return result;
    } catch (error) {
      console.error("Error fetching competition by id:", error);
      throw error;
    }
  }

  async create(comp: Partial<Comp>) {
    try {
      // validation
      competitionSchema.safeParse(comp);

      //TODO: implement users
      // authentication and authorization
      // const { session, user } = await getSession();
      // if (!session) {
      //   throw new Error("Unauthorized");
      // }
      // if (!user.role.includes("admin")) {
      //   throw new Error("Forbidden");
      // }

      const res = await prisma.competition.create({
        data: {
          name: comp.name,
          locationId: comp.locationId,
          date: comp.date,
          description: comp.description || "",
          shape: comp.shape || {},
        },
        omit: { createdAt: true, updatedAt: true },
      });

      // validation
      competitionSchema.parse(res);

      return res;
    } catch (error) {
      console.error("Error creating competition:", error);
      throw error;
    }
  }
}

export const compRepo = new CompRepo();
