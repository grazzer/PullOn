"use client";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompDetailsArea } from "./detailsArea";
import { Category } from "./categories";
import { CategoryDetails } from "./detailsArea";
import { saveCompetitionData } from "../../app/actions/compBuilderFormActions";
import { compBuilderFormSchema } from "../../models/validation/compBuilderform.schema";
import { toast } from "sonner";

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}

function getCompetitionData(): object {
  return null;
  return {
    CompetitionName: "test comp",
    categories: [
      {
        name: "cat 1",
        ageLower: "18",
        ageUpper: "80",
        description: "testing",
        rounds: [
          {
            stage: "1",
            name: "bing",
            maxCompetitors: "",
            problemCount: "",
            gradingStyle: "",
          },
        ],
      },
      {
        name: "",
        ageLower: "0",
        ageUpper: "0",
        description: "",
        rounds: [
          {
            stage: "1",
            name: "",
            maxCompetitors: "",
            problemCount: "",
            gradingStyle: "",
          },
          {
            stage: "2",
            name: "",
            maxCompetitors: "",
            problemCount: "",
            gradingStyle: "",
          },
        ],
      },
    ],
  };
}

function onclickAddCategory(fieldsCategories) {
  fieldsCategories.append({
    name: "",
    ageLower: "0",
    ageUpper: "0",
    description: "",
    rounds: [
      {
        stage: "1",
        name: "",
        maxCompetitors: "0",
        problemCount: "0",
        gradingStyle: "",
      },
    ],
  });
}

export function CompBuilderForm() {
  const hasMounted = useHasMounted();
  const form = useForm<z.infer<typeof compBuilderFormSchema>>({
    resolver: zodResolver(compBuilderFormSchema),
    defaultValues: getCompetitionData() || {
      CompetitionName: "",
      categories: [
        {
          name: "",
          ageLower: "",
          ageUpper: "",
          description: "",
          rounds: [
            {
              stage: "1",
              name: "",
              maxCompetitors: "",
              problemCount: "",
              gradingStyle: "",
            },
          ],
        },
      ],
    },
  });

  async function onSubmit(data) {
    console.log("form data: ", data);
    try {
      const result = await saveCompetitionData(data);
      console.log("save result: ", result);
      toast("Competition has been created.");
    } catch (error) {
      console.error("Error saving competition data:", error);
    }
  }

  const categoryFields = useFieldArray({
    control: form.control,
    name: "categories",
  });

  const [viewIndex, setViewIndex] = useState({
    categoryIndex: 0,
    roundIndex: 0,
  });
  return (
    <form
      id="compBuilderForm"
      onSubmit={form.handleSubmit(onSubmit, (errors) => {
        console.log("form errors:", errors);
      })}
    >
      <PortalCategoryDetails
        form={form}
        viewIndex={viewIndex}
        hasMounted={hasMounted}
        categoryFields={categoryFields}
      />
      <CompDetailsArea form={form} />

      <div>
        <p>Competition Layout</p>
        <ul className="flex w-full flex-col gap-5 ">
          {categoryFields.fields.map((data, index) => {
            return (
              <Category
                key={data.id}
                fieldsCategories={categoryFields}
                categoryIndex={index}
                form={form}
                setViewIndex={setViewIndex}
                viewIndex={viewIndex}
                hasMounted={hasMounted}
              />
            );
          })}
        </ul>
        <AddCategoryButton fieldsCategories={categoryFields} />
      </div>
    </form>
  );
}

function PortalCategoryDetails({
  form,
  viewIndex,
  hasMounted,
  categoryFields,
}) {
  if (categoryFields.fields.length === 0) {
    return null;
  }
  if (!hasMounted) {
    return null;
  }
  const portalTarget =
    typeof window !== "undefined"
      ? document.getElementById("portal-root")
      : null;
  if (portalTarget) {
    return ReactDOM.createPortal(
      <div>
        <CategoryDetails form={form} viewIndex={viewIndex} />
      </div>,
      document.getElementById("portal-root"),
    );
  }
  return null;
}

function AddCategoryButton({ fieldsCategories }) {
  return (
    <div className="flex flex-row   items-center justify-center pt-8">
      <hr className="flex w-full my-5 ml-5" />
      <Button
        variant="outline"
        size="icon"
        className="flex rounded-full mx-5"
        onClick={() => onclickAddCategory(fieldsCategories)}
      >
        <Plus />
      </Button>
      <hr className="flex w-full my-5 mr-5" />
    </div>
  );
}
