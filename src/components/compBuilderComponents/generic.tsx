import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export function BreakLine() {
  return <hr className="flex w-full my-5 ml-10 mr-10" />;
}

export function GenericField({
  field,
  fieldState,
  id,
  label,
  placeholder,
  type = "text",
}) {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        {...field}
        type={type}
        value={field.value ?? ""}
        id={id}
        aria-invalid={fieldState.invalid}
        placeholder={placeholder}
        autoComplete="off"
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
