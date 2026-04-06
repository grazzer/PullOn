"use client";
import { Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import ReactDOM from "react-dom";
import { BreakLine } from "./generic";
import { RoundBlank, RoundOccupied } from "./rounds";
import { RoundDetails } from "./detailsArea";
import { Accordion } from "../ui/accordion";

export function Category({
  categoryIndex,
  form,
  setViewIndex,
  viewIndex,
  fieldsCategories,
  hasMounted,
}) {
  const RoundsFields = useFieldArray({
    control: form.control,
    name: `categories.${categoryIndex}.rounds`,
  });

  return (
    <ul>
      <PortalRoundsDetails
        form={form}
        viewIndex={viewIndex}
        hasMounted={hasMounted}
        roundsFields={RoundsFields}
        categoryIndex={categoryIndex}
        setViewIndex={setViewIndex}
      />
      <div className="flex w-full flex-col">
        <div className="flex flex-row items-center">
          <div className="text-nowrap pb-2 pl-2">
            {form.watch(`categories.${categoryIndex}.name`) == ""
              ? "new category (" + (categoryIndex + 1) + ")"
              : form.watch(`categories.${categoryIndex}.name`)}
          </div>
          <BreakLine />
        </div>
        <div className="flex flex-row gap-5">
          {RoundsFields.fields.map((data, index) => {
            return (
              <RoundOccupied
                key={data.id}
                RoundsFields={RoundsFields}
                form={form}
                categoryIndex={categoryIndex}
                roundIndex={index}
                setViewIndex={setViewIndex}
                viewIndex={viewIndex}
              />
            );
          })}
          {RoundsFields.fields.length < 5 ? (
            <RoundBlank
              RoundsFields={RoundsFields}
              form={form}
              categoryIndex={categoryIndex}
            />
          ) : null}
          <DeleteCat
            fieldsCategories={fieldsCategories}
            categoryIndex={categoryIndex}
          />
        </div>
      </div>
    </ul>
  );
}

function PortalRoundsDetails({
  form,
  viewIndex,
  setViewIndex,
  hasMounted,
  roundsFields,
  categoryIndex,
}) {
  if (!hasMounted) {
    return null;
  }
  const portalTarget =
    typeof window !== "undefined"
      ? document.getElementById("portal-root")
      : null;
  if (portalTarget) {
    return ReactDOM.createPortal(
      <Accordion
        defaultValue={["item-1"]}
        value={[`item-${viewIndex.roundIndex + 1}`]}
      >
        {roundsFields.fields.map((data, roundIndex) => {
          if (!hasMounted) {
            return null;
          }
          const portalTarget = document.getElementById("portal-root");
          if (portalTarget) {
            return ReactDOM.createPortal(
              <RoundDetails
                key={data.id}
                selectedId={viewIndex.categoryIndex}
                roundIndex={roundIndex}
                categoryIndex={categoryIndex}
                form={form}
                viewIndex={viewIndex}
                setViewIndex={setViewIndex}
              />,
              portalTarget,
            );
          }
        })}
      </Accordion>,
      document.getElementById("portal-root"),
    );
  }
  return null;
}

function DeleteCat({ fieldsCategories, categoryIndex }) {
  return (
    <div className="flex text-base center ml-auto">
      <button
        onClick={() => {
          fieldsCategories.remove(categoryIndex);
        }}
        className="p-1 rounded-full border-2 border-gray-300 bg-gray-100 hover:bg-gray-200 active:bg-gray-50"
      >
        <Trash2 className=" size-4  " />
      </button>
    </div>
  );
}
