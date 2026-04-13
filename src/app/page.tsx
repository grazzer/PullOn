import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Comp } from "../models/dataBase.model";
import { compRepo } from "../repo/compRepo";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";

export default async function CompListPage() {
  const data = await compRepo.getAll();

  return (
    <div className="flex min-h-screen w-full  flex-col items-center justify-between py-32 px-16 dark:bg-black sm:items-start">
      <div className="flex flex-row w-full items-center justify-between">
        <p className="pl-3 pt-3 pb-8 text-2xl">Competitions</p>
        <Link href={`/v1/compBuilder`}>
          <Button>+ create new comp</Button>
        </Link>
      </div>
      {data.length > 0 ? (
        data?.map((comp) => <CompListCard key={comp.id} comp={comp} />)
      ) : (
        <div className="flex flex-col items-center justify-center w-full py-20">
          <p className="text-gray-500 text-lg">no competitions yet</p>
        </div>
      )}
    </div>
  );
}

function CompListCard({ comp }: { comp: Comp }) {
  return (
    <div className="w-full flex flex-row justify-between">
      <Card className="my-2 w-full bg-gray-100">
        <CardHeader>
          <CardTitle>{comp.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row  items-center space-x-2">
            <div>comp Id - {comp.id}</div>
            <Separator className="bg-gray-300" orientation="vertical" />
            <div>date - {comp.date.toLocaleString()}</div>
            <Separator className="bg-gray-300" orientation="vertical" />
            <div>location - {comp.locationId}</div>
          </div>
        </CardContent>
      </Card>
      <Link
        className="pl-2 py-2"
        href={`/v1/compResults/add/${encodeURIComponent(comp.id)}`}
      >
        <Card className=" items-center w-20 h-full hover:bg-gray-200 active:bg-gray-50 border-dashed border-2 bg-gray-100 border-gray-300 ring-0 max-w-md">
          <CardContent className="h-full flex flex-col items-center">
            <div className="flex text-base center"> add results</div>
          </CardContent>
        </Card>
      </Link>
      <Link
        className="py-2 pl-1"
        href={`/v1/compResults/view/${encodeURIComponent(comp.id)}`}
      >
        <Card className=" items-center w-20 h-full hover:bg-gray-200 active:bg-gray-50  border-dashed border-2 bg-gray-100 border-gray-300 ring-0 max-w-md">
          <CardContent className="h-full flex flex-col justify-center">
            <div className="flex text-base center">view</div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
