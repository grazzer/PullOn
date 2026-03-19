import { comp } from "../models/dataBase.model";

export interface iCompRepo {
  getAll: () => Promise<comp[] | null>;
  getById: (id: number) => Promise<comp | null>;
  getByLocationId: (locationId: number) => Promise<comp[] | null>;
  // getBySearch: (search: string) => Promise<comp[] | null>; // get by name or date string

  // getByLocationAuth: (location: string) => Promise<comp[] | null>;
  create: (comp: Partial<comp>) => Promise<comp>;
  // update: (id: number, comp: Partial<comp>) => Promise<comp>;
  // delete: (id: number) => Promise<void>;
}
