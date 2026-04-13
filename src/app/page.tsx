import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Comp } from "../models/dataBase.model";
import { compRepo } from "../repo/compRepo";
import Link from "next/link";

export default async function CompListPage() {
  const data = await compRepo.getAll();
  console.log("data: ", data);

  return (
    <div className="flex min-h-screen w-full  flex-col items-center justify-between py-32 px-16 dark:bg-black sm:items-start">
      <div className="flex flex-row">
        <p className="pl-3 pt-3 pb-8 text-2xl">Competitions</p>
      </div>
      {data?.map((comp) => (
        <CompListCard key={comp.id} comp={comp} />
      ))}
    </div>
  );
}

function CompListCard({ comp }: { comp: Comp }) {
  return (
    <Link
      className="w-full"
      href={`/v1/compResults/${encodeURIComponent(comp.id)}`}
    >
      <Card className="my-2 w-full bg-gray-100">
        <CardHeader>
          <CardTitle>{comp.name}</CardTitle>
        </CardHeader>
        <CardContent>comp Id - {comp.id}</CardContent>
      </Card>
    </Link>
  );
}
