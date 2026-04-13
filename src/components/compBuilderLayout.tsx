import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CompBuilderForm } from "./compBuilderComponents/builderForm";

export function CompBuilderLayout() {
  return (
    <div className="flex w-full flex-col ">
      <div className="flex w-full flex-row m-auto items-center justify-between">
        <p className="pl-3 pt-3 pb-8 text-2xl">Competition Builder</p>
        <Button form="compBuilderForm" type="submit">
          save
        </Button>
      </div>
      <div className=" flex w-full flex-row gap-10">
        <div className="flex flex-1">
          <Card className="w-full ">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div id="portal-root" />
            </CardContent>
            <div className="py-1" />
          </Card>
        </div>
        <div className=" flex flex-2">
          <Card className="w-full">
            <CardHeader></CardHeader>
            <CardContent>
              <CompBuilderForm />
            </CardContent>
            <div className="py-1" />
          </Card>
        </div>
      </div>
    </div>
  );
}
