import { useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddItemButton from "@/components/form/AddItemButton";
import ItemCard from "@/components/form/ItemCard";
import { TextField } from "@/components/ui/TextField";
import {
  createEmptyEducation,
  educationFromForm,
  educationToForm,
} from "@/lib/resumeMappers";
import {
  educationSchema,
  type EducationFormValues,
} from "@/schemas/educationSchema";
import { useResumeStore } from "@/store/resumeStore";

export default function EducationForm() {
  const education = useResumeStore((s) => s.resume.education);
  const setEducation = useResumeStore((s) => s.setEducation);

  const {
    register,
    control,
    formState: { errors },
  } = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: educationToForm(education),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const items = useWatch({ control, name: "items" });

  useEffect(() => {
    setEducation(educationFromForm(items));
  }, [items, setEducation]);

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()} noValidate>
      {fields.length === 0 && (
        <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
          No education added yet.
        </p>
      )}

      {fields.map((field, index) => {
        const row = items?.[index];
        const rowErrors = errors.items?.[index];
        const title = row?.school || `Education ${index + 1}`;

        return (
          <ItemCard key={field.id} title={title} onRemove={() => remove(index)}>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="School / College"
                required
                className="sm:col-span-2"
                placeholder="JNTU Hyderabad"
                error={rowErrors?.school?.message}
                {...register(`items.${index}.school`)}
              />
              <TextField
                label="Degree"
                required
                placeholder="B.Tech"
                error={rowErrors?.degree?.message}
                {...register(`items.${index}.degree`)}
              />
              <TextField
                label="Branch / Specialization"
                placeholder="Computer Science and Engineering"
                error={rowErrors?.branch?.message}
                {...register(`items.${index}.branch`)}
              />
              <TextField
                label="Start year"
                placeholder="2019"
                error={rowErrors?.startDate?.message}
                {...register(`items.${index}.startDate`)}
              />
              <TextField
                label="End year"
                placeholder="2023"
                error={rowErrors?.endDate?.message}
                {...register(`items.${index}.endDate`)}
              />
              <TextField
                label="Grade / CGPA"
                className="sm:col-span-2"
                placeholder="8.6 CGPA"
                error={rowErrors?.grade?.message}
                {...register(`items.${index}.grade`)}
              />
            </div>
          </ItemCard>
        );
      })}

      <AddItemButton
        label="Add education"
        onClick={() => append(createEmptyEducation())}
      />
    </form>
  );
}