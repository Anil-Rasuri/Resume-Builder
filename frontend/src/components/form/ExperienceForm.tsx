import { useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddItemButton from "@/components/form/AddItemButton";
import ItemCard from "@/components/form/ItemCard";
import { TextArea } from "@/components/ui/TextArea";
import { TextField } from "@/components/ui/TextField";
import {
  createEmptyExperience,
  experienceFromForm,
  experienceToForm,
} from "@/lib/resumeMappers";
import {
  experienceSchema,
  type ExperienceFormValues,
} from "@/schemas/experienceSchema";
import { useResumeStore } from "@/store/resumeStore";

export default function ExperienceForm() {
  const experience = useResumeStore((s) => s.resume.experience);
  const setExperience = useResumeStore((s) => s.setExperience);

  const {
    register,
    control,
    formState: { errors },
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: experienceToForm(experience),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const items = useWatch({ control, name: "items" });

  // Push every change (typing, add, remove) to the store.
  useEffect(() => {
    setExperience(experienceFromForm(items));
  }, [items, setExperience]);

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()} noValidate>
      {fields.length === 0 && (
        <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
          No experience added yet. Freshers can skip this section and add
          Projects instead.
        </p>
      )}

      {fields.map((field, index) => {
        const row = items?.[index];
        const rowErrors = errors.items?.[index];
        const title =
          [row?.role, row?.company].filter(Boolean).join(" at ") ||
          `Experience ${index + 1}`;

        return (
          <ItemCard key={field.id} title={title} onRemove={() => remove(index)}>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Role"
                required
                placeholder="Software Engineer"
                error={rowErrors?.role?.message}
                {...register(`items.${index}.role`)}
              />
              <TextField
                label="Company"
                required
                placeholder="TechNova Solutions"
                error={rowErrors?.company?.message}
                {...register(`items.${index}.company`)}
              />
              <TextField
                label="Location"
                className="sm:col-span-2"
                placeholder="Hyderabad"
                error={rowErrors?.location?.message}
                {...register(`items.${index}.location`)}
              />
              <TextField
                label="Start date"
                placeholder="Jun 2023"
                error={rowErrors?.startDate?.message}
                {...register(`items.${index}.startDate`)}
              />

              {row?.current ? (
                <div>
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    End date
                  </span>
                  <div className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-500">
                    Present
                  </div>
                </div>
              ) : (
                <TextField
                  label="End date"
                  placeholder="Aug 2025"
                  error={rowErrors?.endDate?.message}
                  {...register(`items.${index}.endDate`)}
                />
              )}

              <label className="flex items-center gap-2 text-sm text-slate-700 sm:col-span-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-200"
                  {...register(`items.${index}.current`)}
                />
                I currently work here
              </label>

              <TextArea
                label="Achievements"
                className="sm:col-span-2"
                rows={5}
                hint="One bullet per line"
                placeholder={
                  "Built REST APIs serving 50k+ daily requests\nReduced page load time by 40%"
                }
                error={rowErrors?.bulletsText?.message}
                {...register(`items.${index}.bulletsText`)}
              />
            </div>
          </ItemCard>
        );
      })}

      <AddItemButton
        label="Add experience"
        onClick={() => append(createEmptyExperience())}
      />
    </form>
  );
}