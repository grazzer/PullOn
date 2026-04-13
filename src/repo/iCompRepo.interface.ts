import { Comp } from "../models/dataBase.model";

export interface iCompRepo {
  getAll: () => Promise<Comp[] | null>;
  getById: (id: number) => Promise<Comp | null>;
  getByLocationId: (locationId: number) => Promise<Comp[] | null>;
  // getBySearch: (search: string) => Promise<comp[] | null>; // get by name or date string

  // getByLocationAuth: (location: string) => Promise<comp[] | null>;
  create: (comp: Partial<Comp>) => Promise<Comp>;
  // update: (id: number, comp: Partial<comp>) => Promise<comp>;
  // delete: (id: number) => Promise<void>;
}
