import { auth } from "./auth";
import { headers } from "next/headers";
import { cache } from "react";

export const getSession = cache(async () => {
  "use server";
  return await auth.api.getSession({
    headers: await headers(),
  });
});
