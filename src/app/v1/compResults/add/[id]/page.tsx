import { compRepo } from "../../../../../repo/compRepo";
import { compShapeSchema } from "../../../../../models/validation/compBuilderform.schema";
import z from "zod";
import {
  Card,
  CardContent,
  CardHeader,
} from "../../../../../components/ui/card";
import { Separator } from "../../../../../components/ui/separator";
import { CompResultsForm } from "../../../../../components/compResults/form";
import { Button } from "../../../../../components/ui/button";
import { auth } from "../../../../../lib/auth";

// async function test() {
//   const data = await auth.api.signUpEmail({
//     body: {
//       name: "Test Man", // required
//       email: "TM.doe@example.com", // required
//       password: "password1234", // required
//     },
//   });
//   console.log("Sign Up:", { data });
// }

export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { id } = await params;
  const data = await compRepo.getById(Number(id));
  const categories = z
    .object({ categories: compShapeSchema.array() })
    .parse(data.shape).categories;

  return (
    <div className="flex min-h-screen w-full  flex-col items-center py-32 px-16 dark:bg-black sm:items-start">
      <div className="flex flex-row w-full items-center justify-between">
        <p className="pl-3 pt-3 pb-8 text-2xl">{data.name} - add results</p>
        <Button form="compResultsForm" type="submit">
          save
        </Button>
      </div>
      <CompResultsForm categories={categories} compData={data} />
    </div>
  );
}
