import { useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddItemButton from "@/components/form/AddItemButton";
import ItemCard from "@/components/form/ItemCard";
import { TextField } from "@/components/ui/TextField";
import {
  certificationsFromForm,
  certificationsToForm,
  createEmptyCertification,
} from "@/lib/resumeMappers";
import {
  certificationsSchema,
  type CertificationsFormValues,
} from "@/schemas/certificationsSchema";
import { useResumeStore } from "@/store/resumeStore";

export default function CertificationsForm() {
  const certifications = useResumeStore((s) => s.resume.certifications);
  const setCertifications = useResumeStore((s) => s.setCertifications);

  const {
    register,
    control,
    formState: { errors },
  } = useForm<CertificationsFormValues>({
    resolver: zodResolver(certificationsSchema),
    defaultValues: certificationsToForm(certifications),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const items = useWatch({ control, name: "items" });

  useEffect(() => {
    setCertifications(certificationsFromForm(items));
  }, [items, setCertifications]);

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()} noValidate>
      {fields.length === 0 && (
        <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
          No certifications added yet.
        </p>
      )}

      {fields.map((field, index) => {
        const row = items?.[index];
        const rowErrors = errors.items?.[index];
        const title = row?.name || `Certification ${index + 1}`;

        return (
          <ItemCard key={field.id} title={title} onRemove={() => remove(index)}>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Certification name"
                required
                className="sm:col-span-2"
                placeholder="AWS Certified Cloud Practitioner"
                error={rowErrors?.name?.message}
                {...register(`items.${index}.name`)}
              />
              <TextField
                label="Issued by"
                placeholder="Amazon Web Services"
                error={rowErrors?.issuer?.message}
                {...register(`items.${index}.issuer`)}
              />
              <TextField
                label="Date"
                placeholder="Mar 2024"
                error={rowErrors?.date?.message}
                {...register(`items.${index}.date`)}
              />
              <TextField
                label="Credential link"
                className="sm:col-span-2"
                placeholder="credly.com/badges/..."
                error={rowErrors?.link?.message}
                {...register(`items.${index}.link`)}
              />
            </div>
          </ItemCard>
        );
      })}

      <AddItemButton
        label="Add certification"
        onClick={() => append(createEmptyCertification())}
      />
    </form>
  );
}