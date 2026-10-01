import { useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddItemButton from "@/components/form/AddItemButton";
import ItemCard from "@/components/form/ItemCard";
import { TextArea } from "@/components/ui/TextArea";
import { TextField } from "@/components/ui/TextField";
import {
  createEmptyProject,
  projectsFromForm,
  projectsToForm,
} from "@/lib/resumeMappers";
import {
  projectsSchema,
  type ProjectsFormValues,
} from "@/schemas/projectsSchema";
import { useResumeStore } from "@/store/resumeStore";

export default function ProjectsForm() {
  const projects = useResumeStore((s) => s.resume.projects);
  const setProjects = useResumeStore((s) => s.setProjects);

  const {
    register,
    control,
    formState: { errors },
  } = useForm<ProjectsFormValues>({
    resolver: zodResolver(projectsSchema),
    defaultValues: projectsToForm(projects),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const items = useWatch({ control, name: "items" });

  useEffect(() => {
    setProjects(projectsFromForm(items));
  }, [items, setProjects]);

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()} noValidate>
      {fields.length === 0 && (
        <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
          No projects added yet.
        </p>
      )}

      {fields.map((field, index) => {
        const row = items?.[index];
        const rowErrors = errors.items?.[index];
        const title = row?.name || `Project ${index + 1}`;

        return (
          <ItemCard key={field.id} title={title} onRemove={() => remove(index)}>
            <div className="grid gap-4">
              <TextField
                label="Project name"
                required
                placeholder="Expense Tracker"
                error={rowErrors?.name?.message}
                {...register(`items.${index}.name`)}
              />
              <TextField
                label="Tech stack used"
                placeholder="React, TypeScript, FastAPI, PostgreSQL"
                error={rowErrors?.techStack?.message}
                {...register(`items.${index}.techStack`)}
              />
              <TextField
                label="Link"
                placeholder="github.com/yourname/project"
                error={rowErrors?.link?.message}
                {...register(`items.${index}.link`)}
              />
              <TextArea
                label="Description"
                rows={3}
                placeholder="What it does and what problem it solves."
                error={rowErrors?.description?.message}
                {...register(`items.${index}.description`)}
              />
            </div>
          </ItemCard>
        );
      })}

      <AddItemButton
        label="Add project"
        onClick={() => append(createEmptyProject())}
      />
    </form>
  );
}