"use client";
import { z } from "zod";
import {
  Controller,
  useFieldArray,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompShape } from "../../models/validation/compBuilderform.schema";
import { toast } from "sonner";
import { Comp } from "../../models/dataBase.model";
import { Separator } from "../ui/separator";
import { Card, CardHeader, CardContent } from "../ui/card";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const scoreSchema = z.object({
  attemptOne: z.boolean(),
  zoneOne: z.boolean(),
  attemptTwo: z.boolean(),
  Topped: z.boolean(),
});

const formSchema = z.object({
  categories: z.array(
    z.object({
      name: z.string(),
      rounds: z.array(
        z.object({
          results: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              score: z.array(scoreSchema),
            }),
          ),
        }),
      ),
    }),
  ),
});

type formShape = z.infer<typeof formSchema>;

// placeholder data
const noOfCompetitors = 5;

function mountFormData(categories: CompShape[]): formShape {
  let defaultValues = [];
  categories.map((cat) => {
    defaultValues.push({
      name: cat.name,
      rounds: cat.rounds.map((round) => ({
        results: Array.from(Array(Number(noOfCompetitors))).map(() => ({
          id: "",
          name: "",
          score: Array.from(Array(Number(round.problemCount))).map(() => ({
            attemptOne: false,
            zoneOne: false,
            attemptTwo: false,
            Topped: false,
          })),
        })),
      })),
    });
  });
  formSchema.parse({ categories: defaultValues });
  return { categories: defaultValues };
}

function onSubmit(data: formShape) {
  console.log(data);
  toast.success("submitted");
}

export function CompResultsForm({
  categories,
  compData,
}: {
  categories: CompShape[];
  compData: Comp;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: mountFormData(categories),
  });

  const categoryFields = useFieldArray({
    control: form.control,
    name: "categories",
  });

  return (
    <form
      id="compResultsForm"
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center justify-start gap-4"
    >
      {categoryFields.fields.map((cat, index) => (
        <Category
          key={cat.id}
          catData={categories[index]}
          catField={cat}
          index={index}
          form={form}
        />
      ))}
    </form>
  );
}

function Category({
  form,
  catField,
  catData,
  index,
}: {
  form: UseFormReturn<formShape>;
  catField: formShape["categories"][number];
  catData: CompShape;
  index: number;
}) {
  const [activeRound, setActiveRound] = useState(0);

  return (
    <Card className="bg-gray-100 w-full ">
      <CardHeader>{catData.name}</CardHeader>
      <CardContent>
        <div className="w-full flex flex-row items-center justify-start gap-4">
          {catData.rounds.map((round, index) => (
            <Round
              key={index}
              activeRound={activeRound}
              index={index}
              setActiveRound={setActiveRound}
              roundData={catData.rounds[index]}
            />
          ))}
        </div>
        <Separator className="my-4 bg-gray-300" />
        <div className="flex text-base center">
          <InputArea
            form={form}
            catField={catField}
            catData={catData}
            catIndex={index}
            roundIndex={activeRound}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function InputArea({
  form,
  catField,
  catData,
  catIndex,
  roundIndex,
}: {
  form: UseFormReturn<formShape>;
  catField: formShape["categories"][number];
  catData: CompShape;
  catIndex: number;
  roundIndex: number;
}) {
  const resultsFields = useFieldArray({
    control: form.control,
    name: `categories.${catIndex}.rounds.${roundIndex}.results`,
  });

  return (
    <Table>
      <TableCaption>input results</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">ID</TableHead>
          <TableHead>Name</TableHead>
          {Array(Number(catData.rounds[roundIndex].problemCount))
            .fill("problem")
            .map((data, index) => (
              <TableHead key={index}>no. {index + 1}</TableHead>
            ))}
          <TableHead className="text-right">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {resultsFields.fields.map((result, resultIndex) => (
          <TableRows
            key={`${roundIndex}-${result.id}`}
            form={form}
            catIndex={catIndex}
            roundIndex={roundIndex}
            resultIndex={resultIndex}
          />
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}

function TableRows({ form, catIndex, roundIndex, resultIndex }) {
  const scoreFields = useFieldArray({
    control: form.control,
    name: `categories.${catIndex}.rounds.${roundIndex}.results.${resultIndex}.score`,
  });
  return (
    <TableRow>
      <TableCell>ID</TableCell>
      <TableCell>Name</TableCell>
      {scoreFields.fields.map((score, index) => (
        <TableCell key={score.id}>
          <div className="flex flex-row">
            <Controller
              control={form.control}
              name={`categories.${catIndex}.rounds.${roundIndex}.results.${resultIndex}.score.${index}.attemptOne`}
              render={({ field }) => <CheckboxFirst field={field} />}
            />
            <Controller
              control={form.control}
              name={`categories.${catIndex}.rounds.${roundIndex}.results.${resultIndex}.score.${index}.zoneOne`}
              render={({ field }) => <Checkbox field={field} />}
            />
            <Controller
              control={form.control}
              name={`categories.${catIndex}.rounds.${roundIndex}.results.${resultIndex}.score.${index}.attemptTwo`}
              render={({ field }) => <Checkbox field={field} />}
            />
            <Controller
              control={form.control}
              name={`categories.${catIndex}.rounds.${roundIndex}.results.${resultIndex}.score.${index}.Topped`}
              render={({ field }) => <CheckboxLast field={field} />}
            />
          </div>
        </TableCell>
      ))}
      <TableCell className="text-right">0</TableCell>
    </TableRow>
  );
}

const CheckboxFirst = ({ field }) => {
  return (
    <div className="checkbox-wrapper">
      <label>
        <input
          className="appearance-none w-6 h-6 bg-red-600 border-r border-ray-50 rounded-l-sm checked:bg-green-600"
          type="checkbox"
          checked={field.value}
          onChange={(e) => field.onChange(e.target.checked)}
          onBlur={field.onBlur}
          ref={field.ref}
        />
      </label>
    </div>
  );
};
const Checkbox = ({ field }) => {
  return (
    <div className="checkbox-wrapper">
      <label>
        <input
          className="appearance-none w-6 h-6 bg-red-600 border-r border-ray-50  checked:bg-green-600 "
          type="checkbox"
          checked={field.value}
          onChange={(e) => field.onChange(e.target.checked)}
          onBlur={field.onBlur}
          ref={field.ref}
        />
      </label>
    </div>
  );
};

const CheckboxLast = ({ field }) => {
  return (
    <div className="checkbox-wrapper">
      <label>
        <input
          className="appearance-none w-6 h-6 bg-red-600 rounded-r-sm checked:bg-green-600 "
          type="checkbox"
          checked={field.value}
          onChange={(e) => field.onChange(e.target.checked)}
          onBlur={field.onBlur}
          ref={field.ref}
        />
      </label>
    </div>
  );
};

function Round({
  activeRound,
  index,
  setActiveRound,
  roundData,
}: {
  activeRound: number;
  index: number;
  setActiveRound: (index: number) => void;
  roundData: CompShape["rounds"][number];
}) {
  const isSelected: boolean = activeRound === index;

  const activeColors = (selected) => {
    if (selected) {
      return "bg-gray-200";
    }
    return null;
  };

  return (
    <Card
      className={`${activeColors(isSelected)} ... flex w-full max-w-md`}
      onClick={() => setActiveRound(index)}
    >
      <CardContent>{roundData.name}</CardContent>
    </Card>
  );
}
