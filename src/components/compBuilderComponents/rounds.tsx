"use client";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";

function onSelectRound(catIndex, rndIndex, setViewIndex) {
  setViewIndex({ categoryIndex: catIndex, roundIndex: rndIndex });
}

function onclickAddRound(RoundsFields, form, categoryIndex) {
  const stage = RoundsFields.fields.length + 1;
  RoundsFields.append({
    stage: stage.toString(),
    name: "",
    maxCompetitors: "",
    problemCount: "",
    gradingStyle: "",
  });

  console.log(stage);
  // form.setValue(
  //   `categories.${categoryIndex}.rounds.${RoundsFields.fields.length}.stage`,
  //   RoundsFields.fields.length + 1,
  //   {
  //     shouldValidate: true,
  //     shouldDirty: true,
  //   },
  // );
}

export function RoundBlank({ RoundsFields, form, categoryIndex }) {
  return (
    <li className="w-17 max-w-xl">
      <Card
        onClick={() => onclickAddRound(RoundsFields, form, categoryIndex)}
        className="hover:bg-gray-200 active:bg-gray-50  border-dashed border-2 bg-gray-100 border-gray-300 ring-0 max-w-xl"
      >
        <CardContent className=" m-auto">
          <div className="flex text-base center">
            <Plus />
          </div>
        </CardContent>
      </Card>
    </li>
  );
}

export function RoundOccupied({
  RoundsFields,
  form,
  categoryIndex,
  roundIndex,
  setViewIndex,
  viewIndex,
}) {
  const isSelected: boolean =
    viewIndex.categoryIndex === categoryIndex &&
    viewIndex.roundIndex === roundIndex;

  const activeColors = (selected) => {
    if (selected) {
      return "bg-gray-200";
    }
    return null;
  };

  return (
    <li className="w-full">
      <Card
        onClick={() => onSelectRound(categoryIndex, roundIndex, setViewIndex)}
        className={`${activeColors(isSelected)} ... max-w-xl`}
      >
        <CardContent className="-7 h-max-7 m-auto w-full">
          <div className="flex flex-row w-full items-center justify-between">
            <div className="flex text-base center text-nowrap">
              {form.watch(
                `categories.${categoryIndex}.rounds.${roundIndex}.name`,
              ) == ""
                ? "new round (" + (roundIndex + 1) + ")"
                : form.watch(
                    `categories.${categoryIndex}.rounds.${roundIndex}.name`,
                  )}
            </div>
            <button
              onClick={() => {
                RoundsFields.remove(roundIndex);
                if (isSelected) {
                  setViewIndex({ categoryIndex: 0, roundIndex: 0 });
                }
              }}
              className="p-1 boarder-1 rounded-full  hover:bg-gray-400  active:bg-gray-500 "
            >
              <Trash2 className=" size-4  " />
            </button>
          </div>
        </CardContent>
      </Card>
    </li>
  );
}
