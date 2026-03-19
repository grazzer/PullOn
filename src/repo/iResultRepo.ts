import { result } from "../models/dataBase.model";

export interface iResultRepo {
  getByCompId: (compId: number) => Promise<result[] | null>;
  getByUserId: (userId: string) => Promise<result[] | null>;
  create: (result: Partial<result>) => Promise<result>;
}
