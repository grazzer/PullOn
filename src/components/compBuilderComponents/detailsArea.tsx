"use client";
import { ChevronDownIcon } from "lucide-react";
import { Controller, useFieldArray } from "react-hook-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { GenericField, BreakLine } from "./generic";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export function CompDetailsArea({ form }) {
  return (
    <div className="pb-8">
      <Controller
        name="CompetitionName"
        control={form.control}
        render={({ field, fieldState }) => (
          <GenericField
            label={"Competition Name"}
            field={field}
            fieldState={fieldState}
            id={"comp-shape-form-comp-name"}
            placeholder={"enter competition name"}
          />
        )}
      />
    </div>
  );
}

export function CategoryDetails({ form, viewIndex }) {
  return (
    <div>
      <Collapsible className="rounded-md data-[state=open]:bg-muted">
        <CollapsibleTrigger>
          <div className="flex flex-row ">
            Category -{" "}
            {form.watch(`categories.${viewIndex.categoryIndex}.name`) == ""
              ? "new category (" + (viewIndex.categoryIndex + 1) + ")"
              : form.watch(`categories.${viewIndex.categoryIndex}.name`)}
            <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
          <Controller
            name={`categories.${viewIndex.categoryIndex}.name`}
            control={form.control}
            render={({ field, fieldState }) => (
              <GenericField
                label={"name"}
                field={field}
                fieldState={fieldState}
                id={`comp-shape-form-category-${viewIndex.categoryIndex}-name`}
                placeholder={"enter category name"}
              />
            )}
          />
          <Controller
            name={`categories.${viewIndex.categoryIndex}.ageLower`}
            control={form.control}
            render={({ field, fieldState }) => (
              <GenericField
                type={"number"}
                label={"age lower"}
                field={field}
                fieldState={fieldState}
                id={`comp-shape-form-category-${viewIndex.categoryIndex}-ageLower`}
                placeholder={"enter age lower limit"}
              />
            )}
          />
          <Controller
            name={`categories.${viewIndex.categoryIndex}.ageUpper`}
            control={form.control}
            render={({ field, fieldState }) => (
              <GenericField
                label={"age upper"}
                field={field}
                fieldState={fieldState}
                id={`comp-shape-form-category-${viewIndex.categoryIndex}-ageUpper`}
                placeholder={"enter age upper limit"}
              />
            )}
          />
          <Controller
            name={`categories.${viewIndex.categoryIndex}.description`}
            control={form.control}
            render={({ field, fieldState }) => (
              <GenericField
                label={"description"}
                field={field}
                fieldState={fieldState}
                id={`comp-shape-form-category-${viewIndex.categoryIndex}-description`}
                placeholder={"enter description"}
              />
            )}
          />
        </CollapsibleContent>
      </Collapsible>
      <BreakLine />
    </div>
  );
}

export function RoundDetails({
  selectedId,
  roundIndex,
  categoryIndex,
  form,
  viewIndex,
  setViewIndex,
}) {
  if (selectedId === categoryIndex) {
    return (
      <AccordionItem
        value={`item-${roundIndex + 1}`}
        className="rounded-md data-[state=open]:bg-muted"
        onOpenChange={(open) => {
          setViewIndex({
            categoryIndex: categoryIndex,
            roundIndex: roundIndex,
          });
        }}
      >
        <AccordionTrigger>
          <div className="flex flex-row " draggable="true">
            Round -{" "}
            {form.watch(
              `categories.${categoryIndex}.rounds.${roundIndex}.name`,
            ) == ""
              ? "new round (" + (roundIndex + 1) + ")"
              : form.watch(
                  `categories.${categoryIndex}.rounds.${roundIndex}.name`,
                )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
          <Controller
            name={`categories.${viewIndex.categoryIndex}.rounds.${roundIndex}.name`}
            control={form.control}
            render={({ field, fieldState }) => (
              <GenericField
                label={"name"}
                field={field}
                fieldState={fieldState}
                id={`comp-shape-form-category-${viewIndex.categoryIndex}-round-${roundIndex}-name`}
                placeholder={"enter round name"}
              />
            )}
          />
          <div>
            stage -{" "}
            {form.watch(
              `categories.${categoryIndex}.rounds.${roundIndex}.stage`,
            )}
          </div>
          <Controller
            name={`categories.${viewIndex.categoryIndex}.rounds.${roundIndex}.maxCompetitors`}
            control={form.control}
            render={({ field, fieldState }) => (
              <GenericField
                label={"max competitors"}
                field={field}
                fieldState={fieldState}
                id={`comp-shape-form-category-${viewIndex.categoryIndex}-round-${roundIndex}-maxCompetitors`}
                placeholder={"enter the maximum number of competitors"}
              />
            )}
          />
          <Controller
            name={`categories.${viewIndex.categoryIndex}.rounds.${roundIndex}.problemCount`}
            control={form.control}
            render={({ field, fieldState }) => (
              <GenericField
                label={"problem count"}
                field={field}
                fieldState={fieldState}
                id={`comp-shape-form-category-${viewIndex.categoryIndex}-round-${roundIndex}-problemCount`}
                placeholder={"enter the number of problems"}
              />
            )}
          />
          <Controller
            name={`categories.${viewIndex.categoryIndex}.rounds.${roundIndex}.gradingStyle`}
            control={form.control}
            render={({ field, fieldState }) => (
              <GenericField
                label={"grading style"}
                field={field}
                fieldState={fieldState}
                id={`comp-shape-form-category-${viewIndex.categoryIndex}-round-${roundIndex}-gradingStyle`}
                placeholder={"enter grading style"}
              />
            )}
          />
        </AccordionContent>
      </AccordionItem>
    );
  }
  return;
}
