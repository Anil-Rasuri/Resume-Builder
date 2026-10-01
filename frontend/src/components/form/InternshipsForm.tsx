import { useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddItemButton from "@/components/form/AddItemButton";
import ItemCard from "@/components/form/ItemCard";
import { TextArea } from "@/components/ui/TextArea";
import { TextField } from "@/components/ui/TextField";
import {
  createEmptyInternship,
  internshipsFromForm,
  internshipsToForm,
} from "@/lib/resumeMappers";
import {
  internshipsSchema,
  type InternshipsFormValues,
} from "@/schemas/internshipsSchema";
import { useResumeStore } from "@/store/resumeStore";

export default function InternshipsForm() {
  const internships = useResumeStore((s) => s.resume.internships);
  const setInternships = useResumeStore((s) => s.setInternships);

  const {
    register,
    control,
    formState: { errors },
  } = useForm<InternshipsFormValues>({
    resolver: zodResolver(internshipsSchema),
    defaultValues: internshipsToForm(internships),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const items = useWatch({ control, name: "items" });

  useEffect(() => {
    setInternships(internshipsFromForm(items));
  }, [items, setInternships]);

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()} noValidate>
      {fields.length === 0 && (
        <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
          No internships added yet.
        </p>
      )}

      {fields.map((field, index) => {
        const row = items?.[index];
        const rowErrors = errors.items?.[index];
        const title =
          [row?.role, row?.company].filter(Boolean).join(" at ") ||
          `Internship ${index + 1}`;

        return (
          <ItemCard key={field.id} title={title} onRemove={() => remove(index)}>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Role"
                required
                placeholder="Frontend Intern"
                error={rowErrors?.role?.message}
                {...register(`items.${index}.role`)}
              />
              <TextField
                label="Company"
                required
                placeholder="CodeCraft Labs"
                error={rowErrors?.company?.message}
                {...register(`items.${index}.company`)}
              />
              <TextField
                label="Location"
                className="sm:col-span-2"
                placeholder="Remote"
                error={rowErrors?.location?.message}
                {...register(`items.${index}.location`)}
              />
              <TextField
                label="Start date"
                placeholder="Jan 2023"
                error={rowErrors?.startDate?.message}
                {...register(`items.${index}.startDate`)}
              />
              <TextField
                label="End date"
                placeholder="Apr 2023"
                error={rowErrors?.endDate?.message}
                {...register(`items.${index}.endDate`)}
              />
              <TextArea
                label="What you did"
                className="sm:col-span-2"
                rows={4}
                hint="One bullet per line"
                placeholder={
                  "Built reusable React components for internal dashboards\nFixed 25+ UI bugs"
                }
                error={rowErrors?.bulletsText?.message}
                {...register(`items.${index}.bulletsText`)}
              />
            </div>
          </ItemCard>
        );
      })}

      <AddItemButton
        label="Add internship"
        onClick={() => append(createEmptyInternship())}
      />
    </form>
  );
}